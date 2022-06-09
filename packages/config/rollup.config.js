import { readFileSync } from 'fs';
import { join } from 'path';
import { defineConfig } from 'rollup';
import autoExternal from 'rollup-plugin-auto-external';
import esbuild from 'rollup-plugin-esbuild';
import json from '@rollup/plugin-json';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';

const dir = 'distribution';
const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8'));
const input = pkg.source;
const globals = {
	react: 'React',
	'react-dom': 'ReactDOM',
};

export default defineConfig([
	{
		input,
		external: ['react', 'react-dom'],
		plugins: [
			postcss({
				modules: true,
				extract: 'styles.css',
			}),
			autoExternal({
				packagePath: join(process.cwd(), 'package.json'),
			}),
			json(),
			esbuild({
				sourceMap: true,
				loaders: 'tsx',
				jsxFactory: 'createElement',
				banner: "import { createElement } from 'react';\n",
			}),
		],
		output: [
			!pkg.main.endsWith('.mjs')
				? {
						dir,
						entryFileNames: '[name].js',
						format: 'cjs',
						sourcemap: true,
						globals,
				  }
				: null,
			{
				dir,
				entryFileNames: '[name].mjs',
				format: 'es',
				sourcemap: true,
				globals,
			},
			{
				dir,
				entryFileNames: '[name].umd.js',
				format: 'umd',
				name: pkg.name,
				sourcemap: true,
			},
		],
	},
	{
		input,
		output: [{ file: `${dir}/index.d.ts`, format: 'es' }],
		plugins: [
			postcss({
				modules: true,
				extract: 'styles.css',
			}),
			autoExternal({
				packagePath: join(process.cwd(), 'package.json'),
			}),
			dts(),
			// ts(),
			// flatDts({
			// 	compilerOptions: {
			// 		declarationMap: true,
			// 		importHelpers: false
			// 	},
			// 	internal: ['@decentology/*'],

			// }),
		],
	},
]);
