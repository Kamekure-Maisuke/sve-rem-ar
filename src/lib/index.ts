// place files you want to import through the `$lib` alias in this folder.
import { argon2id, argon2Verify } from 'hash-wasm';

export async function createHashedPassword(password: string) {
	const salt = new Uint8Array(16);
	crypto.getRandomValues(salt);
	return await argon2id({
		password,
		salt,
		parallelism: 1,
		iterations: 256,
		memorySize: 512,
		hashLength: 32,
		outputType: 'encoded'
	});
}

export async function verifyHashedPassword(password: string, hash: string) {
	return await argon2Verify({ password, hash });
}
