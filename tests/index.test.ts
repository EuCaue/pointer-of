import { cleanup, fireEvent, getByText, render, screen } from '@testing-library/svelte';
import { describe, afterEach, test, it, expect } from 'vitest';
import html from 'svelte-htm';
import Navigation from '../src/lib/Components/Navigation.svelte';
import N from '../src/routes/+layout.svelte';

describe('Navigation', () => {
	// TODO: @testing-library/svelte claims to add this automatically but it doesn't work without explicit afterEach
	afterEach(() => cleanup());

	test('mounts', async () => {
		const { container } = render(N);
		console.log(container);
		const button = screen.getByRole('button');
		await fireEvent.click(button);
	})

	// it('updates on button click', async () => {
	// 	render(Hello, { count: 4 });
	// 	const btn = screen.getByRole('button');
	// 	const div = screen.getByText('4 x 2 = 8');
	// 	await fireEvent.click(btn);
	// 	expect(div.innerHTML).toBe('4 x 3 = 12');
	// 	await fireEvent.click(btn);
	// 	expect(div.innerHTML).toBe('4 x 4 = 16');
	// });
});
