/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')([
	'@decentology/hyperverse',
	'@decentology/hyperverse-ethereum',
	'@decentology/hyperverse-metis',
	'@decentology/hyperverse-ethereum-tribes',
	'@decentology/hyperverse-metis-tribes',
]);

module.exports = withTM({
	reactStrictMode: true,
	images: {
		domains: ['siasky.net', 'fileportal.org'],
	},
});
