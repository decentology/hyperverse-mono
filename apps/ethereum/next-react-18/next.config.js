/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
};

const withTM = require('next-transpile-modules')([
	'@decentology/unstated-next',
	'@decentology/hyperverse',
	'@decentology/hyperverse-ethereum',
	'@decentology/hyperverse-evm-erc721',
]);

module.exports = withTM({
	...nextConfig,
	webpack: (config, { isServer }) => {
		if (isServer) {
			config.externals = ['react', ...config.externals];
		}
		config.resolve.alias['react'] = path.resolve(__dirname, '.', 'node_modules', 'react');
		config.resolve.alias['react-dom'] = path.resolve(__dirname, '.', 'node_modules', 'react-dom');
		return config;
	},
});
