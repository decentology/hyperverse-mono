const path = require('path');
const withTM = require('next-transpile-modules')([
	'@decentology/unstated-next',
	'@decentology/hyperverse',
	'@decentology/hyperverse-ethereum',
	'@decentology/hyperverse-evm-erc721',
]);

module.exports = withTM({
	reactStrictMode: true,
	basePath: process.env.NODE_ENV === 'production' ? '/erc721-app' : null,
	images: {
		...(process.env.NODE_ENV === 'production'
			? {
					loader: 'imgix',
					path: 'https://samples.hyperverse.dev/erc721-app/',
			  }
			: {}),
		domains: ['siasky.net', 'fileportal.org'],
	},
	webpack: (config, { isServer }) => {
		if (isServer) {
			config.externals = ['react', 'react-dom', ...config.externals];
		}
		config.resolve.alias['react'] = path.resolve(__dirname, '.', 'node_modules', 'react');
		config.resolve.alias['react-dom'] = path.resolve(__dirname, '.', 'node_modules', 'react-dom');
		return config;
	},
});
