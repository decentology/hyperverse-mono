import { readFileSync } from 'fs';
import { join } from 'path';
import { defineConfig } from 'rollup';
import autoExternal from 'rollup-plugin-auto-external';
import esbuild from 'rollup-plugin-esbuild';
import json from '@rollup/plugin-json';
import dts from 'rollup-plugin-dts';
import flatDts from 'rollup-plugin-flat-dts';
import ts from 'rollup-plugin-typescript2';
const dir = 'distribution';
const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8'));
const input = pkg.source;

export default defineConfig([
	{
		input,
		external: ['react/jsx-runtime'],
		plugins: [
			autoExternal({
				packagePath: join(process.cwd(), 'package.json'),
			}),
			json(),
			esbuild({ sourceMap: true }),
		],
		output: [
			{
				dir,
				format: 'cjs',
				sourcemap: true,
			},
			{
				dir,
				entryFileNames: '[name].es.js',
				format: 'es',
				sourcemap: true,
			},
		],
	},
	{
		input,
		output: [{ file: `${dir}/index.d.ts`, format: 'es' }],
		plugins: [
			autoExternal({
				packagePath: join(process.cwd(), 'package.json'),
			}),
			ts(),
			flatDts({
				compilerOptions: {
					declarationMap: true,
					importHelpers: false
				},
				internal: ['@decentology/*'],
				
			}),
		],
	},
]);
