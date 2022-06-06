const withTM = require('next-transpile-modules')([
	'@decentology/unstated-next',
	'@decentology/hyperverse',
	'@decentology/hyperverse-ethereum',
	'@decentology/hyperverse-evm-erc721',
]);

module.exports = withTM({
	reactStrictMode: true,
	basePath: '/erc721-app',	
	images: {
		loader: 'imgix',
		path: 'https://dappstarter-samples.azurewebsites.net/erc721-app/',
		domains: ['siasky.net', 'fileportal.org'],
	},
});
