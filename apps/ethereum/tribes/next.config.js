const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const packageJSON = require('./package.json');
const transpiledPackages = Object.keys(packageJSON.dependencies).filter((it) =>
	it.includes('@decentology/')
);
// const withTM = require('next-transpile-modules')(transpiledPackages);
const withTM = require('next-transpile-modules')([
	'@decentology/unstated-next',
	'@decentology/hyperverse',
	'@decentology/hyperverse-ethereum',
	'@decentology/hyperverse-evm-tribes',
]);


module.exports = withTM({
	// webpack: (config, options) => {
	// 	config.resolve.fallback = {
	// 		...config.resolve.fallback,
	// 		assert: false,
	// 		buffer: false,
	// 		console: false,
	// 		constants: false,
	// 		crypto: false,
	// 		domain: false,
	// 		events: false,
	// 		http: false,
	// 		https: false,
	// 		os: false,
	// 		path: false,
	// 		punycode: false,
	// 		process: false,
	// 		querystring: false,
	// 		stream: false,
	// 		string_decoder: false,
	// 		sys: false,
	// 		timers: false,
	// 		tty: false,
	// 		url: false,
	// 		util: false,
	// 		vm: false,
	// 		zlib: false,
	// 		fs: false,
	// 		net: false,
	// 		'stream/web': false
	// 		// assert: require.resolve('assert'),
	// 		// buffer: require.resolve('buffer'),
	// 		// console: require.resolve('console-browserify'),
	// 		// constants: require.resolve('constants-browserify'),
	// 		// crypto: require.resolve('crypto-browserify'),
	// 		// domain: require.resolve('domain-browser'),
	// 		// events: require.resolve('events'),
	// 		// http: require.resolve('stream-http'),
	// 		// https: require.resolve('https-browserify'),
	// 		// os: require.resolve('os-browserify/browser'),
	// 		// path: require.resolve('path-browserify'),
	// 		// punycode: require.resolve('punycode'),
	// 		// process: require.resolve('process/browser'),
	// 		// querystring: require.resolve('querystring-es3'),
	// 		// stream: require.resolve('stream-browserify'),
	// 		// string_decoder: require.resolve('string_decoder'),
	// 		// sys: require.resolve('util'),
	// 		// timers: require.resolve('timers-browserify'),
	// 		// tty: require.resolve('tty-browserify'),
	// 		// url: require.resolve('url'),
	// 		// util: require.resolve('util'),
	// 		// vm: require.resolve('vm-browserify'),
	// 		// zlib: require.resolve('browserify-zlib'),
	// 		// fs: require.resolve('browserify-fs'),
	// 		// net: require.resolve('net-browserify'),
	// 		// ...transpiledPackages.map(x => ({[x]: require.resolve(x)})),
	// 	};
	// 	config.plugins.push(
	// 		new webpack.ProvidePlugin({
	// 			process: 'process/browser',
	// 			Buffer: ['buffer', 'Buffer'],
	// 		}),
	// 		new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
	// 			const mod = resource.request.replace(/^node:/, '');
	// 			if (Object.keys(config.resolve.fallback).includes(mod)) {
	// 				resource.request = require.resolve('buffer');
	// 			}
	// 		// 	// switch (mod) {
	// 		// 	// 	case 'buffer':
	// 		// 	// 		resource.request = 'buffer';
	// 		// 	// 		break;
	// 		// 	// 	case 'stream':
	// 		// 	// 		resource.request = 'readable-stream';
	// 		// 	// 		break;
	// 		// 	// 	case 'fs':
	// 		// 	// 		resource.request = 'browserify-fs';
	// 		// 	// 		break;
	// 		// 	// 	case 'path':
	// 		// 	// 		resource.request = 'path-browserify';
	// 		// 	// 		break;
	// 		// 	// 	case 'util':
	// 		// 	// 		resource.request = 'util';
	// 		// 	// 		break;
	// 		// 	// 	case 'http':
	// 		// 	// 		resource.request = 'https-browserify';
	// 		// 	// 		break;
	// 		// 	// 	case 'https':
	// 		// 	// 		resource.request = 'https-browserify';
	// 		// 	// 		break;
	// 		// 	// 	case 'zlib':
	// 		// 	// 		resource.request = 'browserify-zlib';
	// 		// 	// 		break;
	// 		// 	// 	default:
	// 		// 	// 		throw new Error(`Not found ${mod}`);
	// 		// 	// }
	// 		}),
	// 		// new NodePolyfillPlugin()
	// 	);
	// 	return config;
	// },
	reactStrictMode: true,
	images: {
		domains: ['siasky.net', 'fileportal.org', 'hyperverse.infura-ipfs.io'],
	},
});
