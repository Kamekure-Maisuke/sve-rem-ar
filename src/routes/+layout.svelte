<script>
	import { currentUser } from '$lib/stores/userStore';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		// ユーザーがログインしていなければログインページへリダイレクト
		const unsubscribe = currentUser.subscribe((user) => {
			if (!user && window.location.pathname !== '/login') {
				goto('/login');
			}
		});

		return unsubscribe;
	});
</script>

<main>
	<slot />
</main>
