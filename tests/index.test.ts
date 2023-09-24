import { cleanup, fireEvent, getByText, render, screen } from '@testing-library/svelte';
import { describe, afterEach, test, it, expect } from 'vitest';
import html from 'svelte-htm';
import N from '../src/routes/+layout.svelte';
import Cursor from '$lib/Components/Cursor.svelte';
import cursors from '$lib/data/cursors';

describe('Home', () => {
	// TODO: @testing-library/svelte claims to add this automatically but it doesn't work without explicit afterEach
	afterEach(() => cleanup());

	it('Should render layout from the home', async () => {
		render(N);
	});

	it('Should have all cursor styles on screen', async () => {
		render(Cursor);
		cursors.forEach(async (cursor) => {
			const cursorLi = await screen.findByText(cursor.displayName.trim());
			expect(cursorLi.textContent?.trim()).toEqual(cursor.displayName.trim());
			expect(cursorLi.style.cursor).toEqual(cursor.cssName);
		});
	});
});
