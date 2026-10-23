export type ThemeChoice = 'dark' | 'light' | 'system';

/** Theme switch state. app.html applies the saved choice before the first paint. */
class Theme {
	choice = $state<ThemeChoice>('dark');

	init() {
		const value = document.documentElement.getAttribute('data-theme');
		if (value === 'dark' || value === 'light' || value === 'system') this.choice = value;
	}

	set(choice: ThemeChoice) {
		this.choice = choice;
		document.documentElement.setAttribute('data-theme', choice);
		try {
			localStorage.setItem('theme', choice);
		} catch {
			// Storage is optional.
		}
	}
}

export const theme = new Theme();
