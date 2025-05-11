import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { User } from '../../shared/User';

const storedUser = browser ? localStorage.getItem('currentUser') : null;
const initialUser = storedUser ? JSON.parse(storedUser) : null;

export const currentUser = writable<User | null>(initialUser);

export function setUser(user: User) {
	currentUser.set(user);
	if (browser) {
		localStorage.setItem('currentUser', JSON.stringify(user));
	}
}

export function clearUser() {
	currentUser.set(null);
	if (browser) {
		localStorage.removeItem('currentUser');
	}
}
