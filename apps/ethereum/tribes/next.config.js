const withTM = require('next-transpile-modules')([
	'@decentology/unstated-next',
	'@decentology/hyperverse',
	'@decentology/hyperverse-ethereum',
	'@decentology/hyperverse-evm-tribes',
]);

module.exports = withTM({
	reactStrictMode: true,
	basePath: process.env.NODE_ENV === 'production' ? '/tribes-app' : null,
	images: {
		...(process.env.NODE_ENV === 'production'
			? {
					loader: 'imgix',
					path: 'https://samples.hyperverse.dev/tribes-app/',
			  }
			: {}),
		domains: ['siasky.net', 'fileportal.org', 'hyperverse.infura-ipfs.io'],
	},
});
