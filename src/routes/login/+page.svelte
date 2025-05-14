<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { remult } from 'remult';
	import { User } from '../../shared/User';
	import { createHashedPassword, verifyHashedPassword } from '$lib';
	import { setUser, currentUser } from '$lib/stores/userStore';

	let isLogin = $state(true);
	let username = $state('');
	let email = $state('');
	let password = $state('');
	let error = $state('');

	const salt = new Uint8Array(16);
	crypto.getRandomValues(salt);

	const userRepo = remult.repo(User);

	onMount(() => {
		const unsubscribe = currentUser.subscribe((user) => {
			if (user) {
				goto('/');
			}
		});

		return unsubscribe;
	});

	async function handleSubmit() {
		error = '';

		try {
			if (isLogin) {
				// ログイン処理
				const user = await userRepo.findFirst({ email });
				if (!user) {
					error = 'メールアドレスまたはパスワードが違います';
					return;
				}

				const passwordValid = await verifyHashedPassword(password, user.password);
				if (!passwordValid) {
					error = 'メールアドレスまたはパスワードが違います';
					return;
				}

				setUser(user);
				goto('/');
			} else {
				// 新規登録処理
				const hashedPassword = await createHashedPassword(password);

				const newUser = await userRepo.save({
					username,
					email,
					password: hashedPassword
				});

				setUser(newUser);
				goto('/');
			}
		} catch (err) {
			error = 'エラーが発生しました: ' + err;
		}
	}
</script>

<div class="login-container">
	<h1>{isLogin ? 'ログイン' : '新規登録'}</h1>

	<form onsubmit={handleSubmit}>
		{#if !isLogin}
			<div>
				<label for="username">ユーザー名</label>
				<input id="username" type="text" bind:value={username} required />
			</div>
		{/if}

		<div>
			<label for="email">メールアドレス</label>
			<input id="email" type="email" bind:value={email} required />
		</div>

		<div>
			<label for="password">パスワード</label>
			<input id="password" type="password" bind:value={password} required />
		</div>

		{#if error}
			<p style="color: red">{error}</p>
		{/if}

		<button type="submit">
			{isLogin ? 'ログイン' : '登録'}
		</button>
	</form>

	<p>
		{isLogin ? '初めての方は' : 'アカウントをお持ちの方は'}
		<button onclick={() => (isLogin = !isLogin)}>
			{isLogin ? '新規登録' : 'ログイン'}
		</button>
	</p>
</div>
