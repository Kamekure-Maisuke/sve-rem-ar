<script lang="ts">
	import { remult } from 'remult';
	import { User } from '../../shared/User';

	let users = $state<User[]>([]);
	const userRepo = remult.repo(User);

	$effect(() => {
		userRepo.find().then((u) => (users = u));
	});

	async function handleDelete(userId: string) {
		if (confirm('削除してもよろしいでしょうか？')) {
			await userRepo.delete(userId);
			await userRepo.find().then((u) => (users = u));
		}
	}
</script>

<div>
	<h1>ユーザー管理</h1>

	<table>
		<thead>
			<tr>
				<th>ユーザ名</th>
				<th>Email</th>
				<th>作成日時</th>
				<th></th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each users as user (user.id)}
				<tr>
					<td>{user.username}</td>
					<td>{user.email}</td>
					<td>{user.createdAt.toLocaleString()}</td>
					<td><a href="/users/{user.id}">編集</a></td>
					<td><button onclick={() => handleDelete(user.id)}>削除</button></td>
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
