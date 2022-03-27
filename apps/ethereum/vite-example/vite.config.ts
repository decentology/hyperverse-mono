import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill';
import polyfillNode from 'rollup-plugin-polyfill-node';
import * as React from 'react';
export default defineConfig({
	plugins: [
		polyfillNode(),
		react(),
	],
	build: {
		commonjsOptions: {
			include: [/@decentology/,],
		},
	},
	optimizeDeps: {
		// entries: ['../../../packages/**/*'],
		include: [
			// '@decentology/hyperverse',
			// '@decentology/hyperverse-ethereum',
			// '@decentology/hyperverse-ethereum-randompick',
			// '@decentology/unstated-next',
			// '@decentology/hyperverse-evm',
		],
		// exclude: ['react', 'react-dom'],
		esbuildOptions: {
			define: {
				global: 'globalThis',
			},
			plugins: [
				NodeGlobalsPolyfillPlugin({
					buffer: true,
				}),
			],
		},
	},
	resolve: {
		alias: {
			'react/jsx-runtime': 'react/jsx-runtime.js',
			React: 'react',
		},
	},
	define: {
		process : {
			env: {}
		},
		React: React
	}
});
