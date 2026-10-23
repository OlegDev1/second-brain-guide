import { getContext, setContext } from 'svelte';
import { load, save } from '$lib/storage';

const KEY = 'tab-groups';

/** Chosen label per tab group, shared by every <Tabs group="..."> on the page and remembered. */
export const tabGroups: Record<string, string> = $state({});

let restored = false;

export function restoreTabGroups() {
	if (restored) return;
	restored = true;
	Object.assign(tabGroups, load<Record<string, string>>(KEY, {}));
}

export function chooseTab(group: string, label: string) {
	tabGroups[group] = label;
	save(KEY, { ...tabGroups });
}

export interface TabsContext {
	uid: string;
	register(): number;
	readonly active: number;
}

const TABS = Symbol('tabs');

export function setTabsContext(ctx: TabsContext) {
	setContext(TABS, ctx);
}

export function getTabsContext(): TabsContext {
	return getContext<TabsContext>(TABS);
}
