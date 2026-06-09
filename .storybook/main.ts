import type { StorybookConfig } from '@storybook/svelte-vite';

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(js|ts|svelte)'],
	addons: [
		'@storybook/addon-svelte-csf',
		'@storybook/addon-vitest',
	],
	framework: {
		name: '@storybook/svelte-vite',
		options: {},
	},
	viteFinal: async (config) => {
		// Ensure import.meta.vitest is defined as false in Storybook context
		if (config.define) {
			config.define['import.meta.vitest'] = 'undefined';
		} else {
			config.define = {
				'import.meta.vitest': 'undefined'
			};
		}
		return config;
	},
};

export default config;
