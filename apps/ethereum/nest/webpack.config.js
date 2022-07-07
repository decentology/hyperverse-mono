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

	config.module.rules.unshift({
		// test: /\.tsx?$/,
		test: /\.+(js|jsx|mjs|ts|tsx)$/,

		loader: 'ts-loader',
		// include: [/[\\/]node_modules[\\/]@decentology[\\/]/, ...packages], // <-- instruct to transpile ts files from this path
		// include: [...packages],
		include: createWebpackMatcher(packages),
		type: 'javascript/auto',
		// options: {
		// 	allowTsInNodeModules: true, // <- this a specific option of ts-loader
		// 	transpileOnly: true,
		// 	compilerOptions: {
		// 		module: 'commonjs',
		// 		noEmit: false,
		// 	},
		// },
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
	// console.log(JSON.stringify(config, null, 2));
	return config;
};


const createWebpackMatcher = (
	modulesToTranspile,
) => {
	// create an array of tuples with each passed in module to transpile and its node_modules depth
	// example: ['/full/path/to/node_modules/button/node_modules/icon', 2]
	const modulePathsWithDepth = modulesToTranspile.map((modulePath) => [
		modulePath,
		(modulePath.match(/node_modules/g) || []).length,
	]);

	return (filePath) => {
		const nodeModulesDepth = (filePath.match(/node_modules/g) || []).length;

		return modulePathsWithDepth.some(([modulePath, moduleDepth]) => {
			// Ensure we aren't implicitly transpiling nested dependencies by comparing depths of modules to be transpiled and the module being checked
			const transpiled =
				filePath.startsWith(modulePath) &&
				nodeModulesDepth === moduleDepth;
			if (transpiled) console.log(`transpiled: ${filePath}`);
			return transpiled;
		});
	};
};
