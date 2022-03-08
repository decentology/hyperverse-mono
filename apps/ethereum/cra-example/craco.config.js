const path = require('path');
const { getLoader, loaderByName } = require('@craco/craco');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const fs = require('fs');

// List full directory path folders in packages directory

const packages = fs
	.readdirSync(path.resolve(__dirname, '../../../packages'))
	.map(p => path.join(__dirname, '../../../', p));

module.exports = {
	webpack: {
		configure: (webpackConfig, arg) => {
			const { isFound, match } = getLoader(webpackConfig, loaderByName('babel-loader'));
			if (isFound) {
				const include = Array.isArray(match.loader.include)
					? match.loader.include
					: [match.loader.include];

				match.loader.include = include.concat(packages);
			}
			webpackConfig.resolve.alias = {
				...webpackConfig.resolve.alias,
				'react/jsx-runtime': 'react/jsx-runtime.js'
			};
			// Webpack fallback http
			webpackConfig.resolve.fallback = {
				...webpackConfig.resolve.fallback,
				http: require.resolve('stream-http')
			};

			webpackConfig.plugins.push(new NodePolyfillPlugin());
			return webpackConfig;
		}
	}
};
