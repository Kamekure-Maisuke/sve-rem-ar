import { describe, it, expect } from 'vitest';
import { createHashedPassword, verifyHashedPassword } from '$lib';

describe('パスワード検証', () => {
	const examplePassword = 'sample';

	it('パスワード一致', async () => {
		const hashedPassword = await createHashedPassword(examplePassword);
		const passwordValid = await verifyHashedPassword(examplePassword, hashedPassword);

		expect(passwordValid).toBe(true);
	});

	it('パスワード不一致', async () => {
		const hashedPassword = await createHashedPassword(examplePassword);
		const passwordValid = await verifyHashedPassword('Hello', hashedPassword);

		expect(passwordValid).toBe(false);
	});
});
