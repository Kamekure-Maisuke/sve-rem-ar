import { remultApi } from 'remult/remult-sveltekit';
import { User } from '../shared/User';
import { Tag } from '../shared/Tag';

export const api = remultApi({
	entities: [User, Tag],
	admin: true
});
