import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill';
import polyfillNode from 'rollup-plugin-polyfill-node';
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		polyfillNode(),
		react(),

	],
	optimizeDeps: {
		include: [
			// '@decentology/hyperverse',
			// '@decentology/hyperverse-evm',
			// '@decentology/web3modal',
			// '@decentology/hyperverse-ethereum'
		],
		esbuildOptions: {
			define: {
				global: "globalThis"
			},
			plugins: [
				NodeGlobalsPolyfillPlugin({
					buffer: true
				})
			]
		}
		// exclude: ['@decentology/web3modal']
	},
	build: {
		commonjsOptions: {
			// include: ['@decentology/web3modal']
		}
	},
	resolve: {
		alias: {
			'react/jsx-runtime': 'react/jsx-runtime.js',
			// buffer: 'buffer'
		}
	},
	define: {
		global: {},
		process: {
			env: {}
		}
	}
});
