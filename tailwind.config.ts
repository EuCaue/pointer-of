import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			animation: {
				caret: 'blink infinite 0.8s'
			},
			keyframes: {
				blink: {
					'0%': {
						opacity: '0'
					},
					'0.1%': {
						opacity: '1'
					},
					'50%': {
						opacity: '1'
					},
					'50.1%': {
						opacity: '0'
					},
					'100%': {
						opacity: '0'
					}
				}
			}
		}
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				preset: [
					{
						name: 'skeleton',
						enhancements: true
					}
				]
			}
		})
	]
} satisfies Config;
