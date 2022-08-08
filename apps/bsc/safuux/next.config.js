/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')([
	'@decentology/unstated-next',
	'@decentology/hyperverse',
	'@decentology/hyperverse-bsc',
	'@decentology/hyperverse-bsc-safuu',
]);

module.exports = withTM({
	reactStrictMode: true,
	swcMinify: true,
});


