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

	return config;
};
