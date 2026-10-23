import { load, save } from './storage';

const KEY = 'read-chapters';

/** Chapters the reader has scrolled to the end of, keyed "section/slug". */
class ReadMarks {
	keys = $state<string[]>([]);

	init() {
		this.keys = load<string[]>(KEY, []);
	}

	has(key: string): boolean {
		return this.keys.includes(key);
	}

	mark(key: string) {
		if (this.keys.includes(key)) return;
		this.keys = [...this.keys, key];
		save(KEY, this.keys);
	}
}

export const readMarks = new ReadMarks();
