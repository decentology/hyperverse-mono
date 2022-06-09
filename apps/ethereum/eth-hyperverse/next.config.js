const withTM = require('next-transpile-modules')([
	'@decentology/unstated-next',
	'@decentology/hyperverse',
	'@decentology/hyperverse-ethereum',
	'@decentology/hyperverse-evm-erc20',
	'@decentology/hyperverse-evm-erc721',
])

module.exports = withTM({
	reactStrictMode: true,
	images: {
		...(process.env.NODE_ENV === 'production'
			? {
					loader: 'imgix',
					path: 'https://eth.hyperverse.dev/',
			  }
			: {}),
		domains: ['siasky.net', 'fileportal.org'],
	},
})
