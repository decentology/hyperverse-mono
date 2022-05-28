const withTM = require('next-transpile-modules')([
	'@decentology/unstated-next',
	'@decentology/hyperverse',
	'@decentology/hyperverse-ethereum',
	'@decentology/hyperverse-evm-erc721',
  '@decentology/hyperverse-evm-erc20',
  '@decentology/hyperverse-evm-erc777',
  '@decentology/hyperverse-evm-stake-rewards',
  '@decentology/hyperverse-evm-whitelist',
]);

module.exports = withTM({
	reactStrictMode: true,
	images: {
		domains: ['siasky.net', 'fileportal.org'],
	},
});
