<script lang="ts">
	import { remult } from 'remult';
	import { Tag } from '../../shared/Tag';

	let cacheSearchWord = $state('');
	let searchWord = $state('');
	let tags = $state<Tag[]>([]);
	const tagRepo = remult.repo(Tag);

	$effect(() => {
		tagRepo.find().then((t) => (tags = t));
	});

	async function handleDelete(tagId: string) {
		if (confirm('削除してもよろしいでしょうか？')) {
			await tagRepo.delete(tagId);
			await tagRepo.find().then((t) => (tags = t));
		}
	}

	async function handleSearch(event: Event) {
		event.preventDefault();
		searchWord = searchWord.trim();
		if (searchWord === '' || cacheSearchWord === searchWord) {
			return;
		}
		cacheSearchWord = searchWord;

		tags = await tagRepo.find({
			where: {
				name: {
					$contains: searchWord
				}
			}
		});
	}
</script>

<div>
	<h1>タグ管理</h1>

	<a href="/tags/new">タグ登録</a>

	<div>
		<form onsubmit={handleSearch}>
			<input type="search" placeholder="検索語を入力..." bind:value={searchWord} />
		</form>
	</div>

	<table>
		<thead>
			<tr>
				<th>タグ名</th>
				<th>作成日時</th>
				<th></th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each tags as tag (tag.id)}
				<tr>
					<td>{tag.name}</td>
					<td>{tag.createdAt.toLocaleString()}</td>
					<td><a href="/tags/{tag.id}">編集</a></td>
					<td><button onclick={() => handleDelete(tag.id)}>削除</button></td>
				</tr>
			{/each}
		</tbody>
	</table>

	<a href="/">ホーム</a>
</div>

<style>
	table,
	th,
	td {
		border: 1px solid black;
		border-collapse: collapse;
		padding: 1em;
	}
</style>
