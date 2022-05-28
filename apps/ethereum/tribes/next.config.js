const withTM = require('next-transpile-modules')([
	'@decentology/unstated-next',
	'@decentology/hyperverse',
	'@decentology/hyperverse-ethereum',
	'@decentology/hyperverse-evm-tribes',
]);

module.exports = withTM({
	reactStrictMode: true,
	images: {
		domains: ['siasky.net', 'fileportal.org', 'hyperverse.infura-ipfs.io'],
	},
});
