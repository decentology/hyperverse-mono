const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const packageJSON = require('./package.json');
const transpiledPackages = Object.keys(packageJSON.dependencies).filter((it) =>
	it.includes('@decentology/')
);
const withTM = require('next-transpile-modules')(transpiledPackages);
// const withTM = require('next-transpile-modules')([
// 	'@decentology/unstated-next',
// 	'@decentology/hyperverse',
// 	'@decentology/hyperverse-ethereum',
// 	'@decentology/hyperverse-evm-tribes',
// ]);


module.exports = withTM({
	reactStrictMode: true,
	images: {
		domains: ['siasky.net', 'fileportal.org', 'hyperverse.infura-ipfs.io'],
	},
});
