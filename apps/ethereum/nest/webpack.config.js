const path = require('path');
const fs = require('fs');

const packages = fs
	.readdirSync(path.resolve(__dirname, '../../../packages'))
	.map((p) => path.join(__dirname, '../../../packages', p));

module.exports = function (options) {
	const config = {
		...options,
		plugins: [...options.plugins],
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
		...packages,
	];

	config.module.rules.push({
		test: /\.tsx?$/,
		loader: 'ts-loader',
		// include: [/[\\/]node_modules[\\/]@decentology[\\/]/, ...packages], // <-- instruct to transpile ts files from this path
		include: [...packages],
		options: {
			allowTsInNodeModules: true, // <- this a specific option of ts-loader
			transpileOnly: true,
			compilerOptions: {
				module: 'commonjs',
				noEmit: false,
			},
		},
	});
	// config.resolve.alias = {
	// 	...options.resolve.alias,
	// 	'@decentology/*': [path.resolve(__dirname, '../../../packages/*')],
	// };
	// config.resolve.alias = {
	// 	...options.resolve.alias,
	// 	'@decentology/hyperverse': path.resolve(
	// 		__dirname,
	// 		'../../../packages/hyperverse',
	// 	),
	// 	'@decentology/unstated-next': path.resolve(
	// 		__dirname,
	// 		'../../../packages/unstated-next',
	// 	),
	// };
	console.log(JSON.stringify(config, null, 2));
	return config;
};
