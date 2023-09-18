import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';
const r = (p: string) => resolve(__dirname, p);

export default defineConfig({
	plugins: [svelte({ hot: !process.env.VITEST })],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./setupTest.ts']
	},
	resolve: {
		alias: {
			$lib: r('src/lib'),
			'$lib*': r('src/lib/*')
		}
	}
});
