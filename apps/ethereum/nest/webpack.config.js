const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = function (options, webpack) {
	const config = {
		...options,
		entry: ['webpack/hot/poll?100', options.entry],
		externals: [
			nodeExternals({
				allowlist: ['webpack/hot/poll?100'],
			}),
		],
		plugins: [
			...options.plugins,
			new webpack.HotModuleReplacementPlugin(),
			new webpack.WatchIgnorePlugin({
				paths: [/\.js$/, /\.d\.ts$/],
			}),
			new RunScriptWebpackPlugin({ name: options.output.filename }),
		],
	};
	console.log(path.join(__dirname, '../../../packages/hyperverse'));
	config.module.rules[0].include = [
		path.join(__dirname, '../../../packages/hyperverse'),
		path.join(__dirname, '../../../packages/hyperverse-evm'),
		path.join(__dirname, '../../../packages/hyperverse-evm-tribes'),
	];

	return config;
};

function test(a, b) {
	console.log('got here');
	return {
		entry: ['webpack/hot/poll?100', './src/main.ts'],
		target: 'node',
		externals: [
			nodeExternals({
				allowlist: ['webpack/hot/poll?100'],
			}),
		],
		module: {
			rules: [
				{
					test: /.tsx?$/,
					use: 'ts-loader',
					inlcude: [
						path.join(__dirname, '../../../packages/hyperverse'),
						path.join(
							__dirname,
							'../../../packages/hyperverse-evm',
						),
						path.join(
							__dirname,
							'../../../packages/hyperverse-evm-tribes',
						),
					],
					exclude: /node_modules/,
				},
				{
					test: /\.(png|svg|jpg|gif)$/,
					use: [
						{
							loader: 'url-loader',
							options: {
								limit: 65535,
								name: 'static/media/[name].[hash:8].[ext]',
							},
						},
					],
				},
			],
		},
		mode: 'development',
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new RunScriptWebpackPlugin({ name: 'server.js' }),
		],
		output: {
			path: path.join(__dirname, 'dist'),
			filename: 'server.js',
		},
	};
}

// const settings = {
// 	entry: ['webpack/hot/poll?100', './src/main.ts'],
// 	target: 'node',
// 	externals: [
// 		nodeExternals({
// 			allowlist: ['webpack/hot/poll?100'],
// 		}),
// 	],
// 	module: {
// 		rules: [
// 			{
// 				test: /.tsx?$/,
// 				use: 'ts-loader',
// 				inlcude: [
// 					path.join(__dirname, '../../../packages/hyperverse'),
// 					path.join(__dirname, '../../../packages/hyperverse-evm'),
// 					path.join(
// 						__dirname,
// 						'../../../packages/hyperverse-evm-tribes',
// 					),
// 				],
// 				exclude: /node_modules/,
// 			},
// 			{
// 				test: /\.(png|svg|jpg|gif)$/,
// 				use: [
// 					{
// 						loader: 'url-loader',
// 						options: {
// 							limit: 65535,
// 							name: 'static/media/[name].[hash:8].[ext]',
// 						},
// 					},
// 				],
// 			},
// 		],
// 	},
// 	mode: 'development',
// 	resolve: {
// 		extensions: ['.tsx', '.ts', '.js'],
// 	},
// 	plugins: [
// 		new webpack.HotModuleReplacementPlugin(),
// 		new RunScriptWebpackPlugin({ name: 'server.js' }),
// 	],
// 	output: {
// 		path: path.join(__dirname, 'dist'),
// 		filename: 'server.js',
// 	},
// };
