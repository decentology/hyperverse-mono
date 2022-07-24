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
const input = pkg.exports
	? Object.assign(
			{},
			...Object.entries(pkg.exports)
				.filter(([key]) => !key.includes('.css'))
				.map(([key, value]) => {
					key = key === '.' ? 'index' : key.replace('./', '');
					return [key, value.import || value.default || value];
				})
				.map((x) => ({ [x[0]]: x[1] }))
	  )
	: { ['index']: pkg.source };
const globals = {
	react: 'React',
	'react-dom': 'ReactDOM',
};

const base = {
	// external: ['react', 'react-dom'],
	plugins: [
		postcss({
			modules: true,
			extract: 'styles.css',
		}),
		autoExternal({
			packagePath: join(process.cwd(), 'package.json'),
		}),
		json(),
	],
};

export default defineConfig([
	...Object.entries(input).map(([key, value]) => {
		return {
			...base,
			input: { [key]: value },
			external: key === 'react' ? ['react', 'react-dom'] : null,
			plugins: [
				...base.plugins,
				key === 'react'
					? esbuild({
							sourceMap: true,
							loaders: 'tsx',
							jsxFactory: 'createElement',
							banner: "import { createElement } from 'react';\n",
					  })
					: esbuild({
							sourceMap: true,
					  }),
			],
			output: {
				dir,
				entryFileNames: '[name].' + (key === 'react' ? 'mjs' : 'js'),
				format: key === 'react' ? 'es' : 'cjs',
				sourcemap: true,
				globals,
			},
		};
	}),
	{
		input,
		output: [{ dir: `${dir}`, format: 'es' }],
		plugins: [
			postcss({
				modules: true,
				extract: 'styles.css',
			}),
			autoExternal({
				packagePath: join(process.cwd(), 'package.json'),
			}),
			dts(),
		],
	},
]);
