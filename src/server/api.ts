import { remultApi } from 'remult/remult-sveltekit';
import { User } from '../shared/User';

export const api = remultApi({
	entities: [User],
	admin: true
});
