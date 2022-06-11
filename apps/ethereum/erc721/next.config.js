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
});
