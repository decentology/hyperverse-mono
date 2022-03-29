const path = require('path');
const { getLoader, loaderByName } = require('@craco/craco');
const fs = require('fs');

// List full directory path folders in packages directory

const packages = fs
	.readdirSync(path.resolve(__dirname, '../../../packages'))
	.map(p => path.join(__dirname, '../../../packages', p));

module.exports = {
	webpack: {
		configure: (webpackConfig) => {
			const { isFound, match } = getLoader(webpackConfig, loaderByName('babel-loader'));


			if (isFound) {
				const include = Array.isArray(match.loader.include)
					? match.loader.include
					: [match.loader.include];

				match.loader.include = include.concat(packages);
			}

			return webpackConfig;
		}
	}
};
