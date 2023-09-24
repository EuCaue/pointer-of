import { cleanup, fireEvent, getByText, render, screen, waitFor } from '@testing-library/svelte';
import { describe, afterEach, test, it, expect } from 'vitest';
import html from 'svelte-htm';
import About from '../src/routes/about/+page.svelte';

describe('About Page', () => {
	// TODO: @testing-library/svelte claims to add this automatically but it doesn't work without explicit afterEach
	afterEach(() => cleanup());

	it('Should render the About Component', async () => {
		render(About);
	});

	it('Should has the about text', async () => {
		render(About);
		const h1 = screen.getByRole('heading');
		expect(h1).toBeDefined();
	});
});
