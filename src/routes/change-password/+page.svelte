<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { remult } from 'remult';
	import { currentUser, clearUser } from '$lib/stores/userStore';
	import { User } from '../../shared/User';
	import { argon2id, argon2Verify } from 'hash-wasm';

	const salt = new Uint8Array(16);
	crypto.getRandomValues(salt);

	let user: User;
	const userRepo = remult.repo(User);

	onMount(() => {
		const unsubscribe = currentUser.subscribe((value) => {
			if (!value) {
				goto('/login');
			} else {
				user = value;
			}
		});
		return unsubscribe;
	});

	let currentPassword = $state('');
	let newPassword = $state('');
	let error = $state('');

	async function handleSubmit() {
		error = '';
		try {
			const passwordValid = await argon2Verify({
				password: currentPassword,
				hash: user.password
			});
			if (!passwordValid) {
				error = '現在のパスワードが違います';
				return;
			}

			const hashedPassword = await argon2id({
				password: newPassword,
				salt,
				parallelism: 1,
				iterations: 256,
				memorySize: 512,
				hashLength: 32,
				outputType: 'encoded'
			});

			await userRepo.update(user.id, {
				...user,
				password: hashedPassword
			});

			clearUser();
			goto('/login');
		} catch (err) {
			error = 'エラー: ' + err;
		}
	}
</script>

<div>
	<h1>パスワード変更</h1>

	<form onsubmit={handleSubmit}>
		<div>
			<label for="currentPassword">現在のパスワード</label>
			<input id="currentPassword" type="password" bind:value={currentPassword} required />
		</div>

		<div>
			<label for="newPassword">新しいパスワード</label>
			<input id="newPassword" type="password" bind:value={newPassword} required />
		</div>

		{#if error}
			<p style="color: red">{error}</p>
		{/if}

		<button type="submit">変更</button>
	</form>

	<a href="/">ホーム</a>
</div>
