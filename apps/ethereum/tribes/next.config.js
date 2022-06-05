const withTM = require('next-transpile-modules')([
	'@decentology/unstated-next',
	'@decentology/hyperverse',
	'@decentology/hyperverse-ethereum',
	'@decentology/hyperverse-evm-tribes',
]);

module.exports = withTM({
	reactStrictMode: true,
	images: {
		loader: 'imgix',
		path: 'https://dappstarter-samples.azurewebsites.net/',
		domains: ['siasky.net', 'fileportal.org', 'hyperverse.infura-ipfs.io'],
	},
});
