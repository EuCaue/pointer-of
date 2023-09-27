import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type CursorsThemes = 'adwaita' | 'macOS' | 'windows-ish';

export type ITheme = {
	isOn: boolean;
	cursorTheme: CursorsThemes;
};

const defaultValue: ITheme = { isOn: false, cursorTheme: 'macOS' };

const initialValue = browser
	? JSON.parse(window.localStorage.getItem('customCursorTheme')!) ?? defaultValue
	: defaultValue;

const customCursorTheme = writable<ITheme>(initialValue);

customCursorTheme.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('customCursorTheme', JSON.stringify(value));
	}
});

export default customCursorTheme;
