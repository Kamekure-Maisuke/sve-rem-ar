<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { User } from '../shared/User';
	import { currentUser, clearUser } from '$lib/stores/userStore';

	let user: User | null = null;

	onMount(() => {
		const unsubscribe = currentUser.subscribe((value) => {
			user = value;
			if (!value) {
				goto('/login');
			}
		});
		return unsubscribe;
	});

	function handleLogout() {
		clearUser();
		goto('/login');
	}
</script>

<div>
	<header>
		<h1>ホーム</h1>
		<p>{user?.username}がログインしました</p>
		<div>
			<a href="/change-password">パスワード変更はこちら</a>
		</div>
		<div>
			<button onclick={handleLogout}>ログアウト</button>
		</div>
	</header>
</div>
