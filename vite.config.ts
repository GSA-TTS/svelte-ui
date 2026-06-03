import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
	plugins: [
		svelte(),
		dts({
			insertTypesEntry: true,
			include: ['src/lib/**/*.ts', 'src/lib/**/*.svelte'],
			exclude: ['src/**/*.test.ts', 'src/**/*.spec.ts', 'src/**/*.stories.ts']
		})
	],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/lib/index.ts'),
			name: 'SvelteUI',
			fileName: (format) => `svelte-ui.${format}.js`
		},
		rollupOptions: {
			external: ['svelte', 'svelte/internal'],
			output: {
				globals: {
					svelte: 'Svelte'
				}
			}
		}
	},
	test: {
		include: ['src/**/*.{test,spec,stories}.{js,ts}'],
		includeSource: ['src/**/*.{js,ts,svelte}'],
		globals: true,
		environment: 'jsdom',
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			exclude: [
				'node_modules/',
				'src/**/*.spec.ts',
				'**/*.config.{js,ts}',
				'**/dist/**'
			]
		}
	},
	server: {
		host: '0.0.0.0',
		port: 5173
	}
});
