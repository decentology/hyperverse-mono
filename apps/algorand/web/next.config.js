const withTM = require('next-transpile-modules')([
	'@decentology/web3modal',
	'@decentology/unstated-next',
	'@decentology/hyperverse',
	'@decentology/hyperverse-algorand',
	'@decentology/hyperverse-algorand-counter',
]);

module.exports = withTM({
	reactStrictMode: true,
	webpack: (config) => {
		config.module = {
			...config.module,
			noParse: /(gun|sea)\.js$/,
		};
		return config;
	},
});
