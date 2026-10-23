import { getContext, setContext } from 'svelte';

export type Side = 'before' | 'after';

const KEY = Symbol('before-after');

export function setSideContext(get: () => Side) {
	setContext(KEY, get);
}

export function getSide(): () => Side {
	return getContext<() => Side>(KEY);
}
