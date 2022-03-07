import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
import refreshRefresh from '@vitejs/plugin-react-refresh';
import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill';
import polyfillNode from 'rollup-plugin-polyfill-node';
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		polyfillNode(),
		refreshRefresh(),

	],
	optimizeDeps: {
		// include: [
		// 	'@decentology/hyperverse',
		// 	'@decentology/hyperverse-evm',
		// 	'@decentology/web3modal',
		// 	'@decentology/hyperverse-ethereum',
		// 	'@decentology/hyperverse-ethereum-randompick'
		// ],
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
	// build: {
	// 	commonjsOptions: {
	// 		include: [
	// 			'@decentology/hyperverse',
	// 			'@decentology/hyperverse-evm',
	// 			'@decentology/web3modal',
	// 			'@decentology/hyperverse-ethereum',
	// 			'@decentology/hyperverse-ethereum-randompick'
	// 		]
	// 	}
	// },
	resolve: {
		alias: {
			'react/jsx-runtime': 'react/jsx-runtime.js',
			'@decentology/hyperverse': 'hyperverse',
			'@decentology/hyperverse-evm': 'hyperverse-evm',
			'@decentology/web3modal': 'web3modal',
			'@decentology/hyperverse-ethereum': 'hyperverse-ethereum',
			'@decentology/hyperverse-ethereum-randompick': 'hyperverse-ethereum-randompick'	
		}
	},
	define: {
		global: {},
		process: {
			env: {}
		}
	}
});
