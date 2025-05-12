<script lang="ts">
	import { repo } from 'remult';
	import { Tag } from '../../../shared/Tag';
	import { goto } from '$app/navigation';
	import type { RemultApiError } from '$lib/types/apiError';

	const tagRepo = repo(Tag);
	let tagname = $state('');
	let error = $state('');

	async function handleAdd() {
		try {
			await tagRepo.save({ name: tagname });
			goto('/tags');
		} catch (err) {
			const apiError = err as RemultApiError;
			if (apiError.status === 400) {
				if (apiError.message?.includes('already exists')) {
					error = '既に登録済みです。別の名前をお試しください。';
				} else {
					error = `入力値が不正です: ${apiError.message}`;
				}
			} else if (apiError.status === 401) {
				error = '認証エラー: この操作を行う権限がありません。';
			} else if (apiError.status === 500) {
				error = 'サーバーエラーが発生しました。しばらく経ってからお試しください。';
			} else {
				error = `エラーが発生しました: ${apiError.message}`;
			}
		}
	}
</script>

<div>
	<h1>タグ登録</h1>

	<form onsubmit={handleAdd}>
		<div>
			<label for="tagname">ユーザー名</label>
			<input id="tagname" type="text" bind:value={tagname} required />
		</div>

		{#if error}
			<p style="color: red">{error}</p>
		{/if}

		<button type="submit">登録</button>
	</form>

	<a href="/tags">タグ管理</a>
	<a href="/">ホーム</a>
</div>
