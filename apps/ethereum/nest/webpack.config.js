const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = function (options, webpack) {
	const config = {
		...options,
		// entry: ['webpack/hot/poll?100', options.entry],
		// externals: [
		// 	nodeExternals({
		// 		allowlist: ['webpack/hot/poll?100'],
		// 	}),
		// ],
		plugins: [
			...options.plugins,
			// new webpack.HotModuleReplacementPlugin(),
			// new webpack.WatchIgnorePlugin({
			// 	paths: [/\.js$/, /\.d\.ts$/],
			// }),
			// new RunScriptWebpackPlugin({ name: options.output.filename }),
		],
	};
	config.module.rules.push({
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
	});
	config.module.rules[0].include = [
		path.join(__dirname, './src'),
		path.join(__dirname, '../../../packages/hyperverse'),
		path.join(__dirname, '../../../packages/hyperverse-evm'),
		path.join(__dirname, '../../../packages/hyperverse-evm-tribes'),
		path.join(__dirname, '../../../packages/hyperverse-storage-skynet'),
		path.join(__dirname, '../../../packages/unstated-next'),
		path.join(__dirname, '../../../packages/web3modal'),
	];

	config.resolve.alias = {
		...options.resolve.alias,
		'@decentology/hyperverse': path.resolve(
			__dirname,
			'../../../packages/hyperverse',
		),
		'@decentology/unstated-next': path.resolve(
			__dirname,
			'../../../packages/unstated-next',
		),
		'@decentology/web3modal': path.resolve(
			__dirname,
			'../../../packages/web3modal',
		),
	};

	config.resolve.fallback = {
		...options.resolve.fallback,
		fetch: path.resolve('node-fetch')
	}

	return config;
};

function test(a, b) {
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
