import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill';
import * as React from 'react';
export default defineConfig({
	plugins: [react()],
	optimizeDeps: {
		include: [],
		esbuildOptions: {
			define: {
				global: 'globalThis',
				"globalThis.process.env.NODE_ENV": "development"
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
			'stream': 'stream-browserify',
			'http': 'http-browserify',
		},
	},
	define: {
		React: React,
	},
});
