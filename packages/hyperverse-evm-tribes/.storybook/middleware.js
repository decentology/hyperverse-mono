const { createProxyMiddleware } = require('http-proxy-middleware');
const hardhat = require('hardhat');
const { join } = require('path');
const waitOn = require('wait-on');
const watch = require('node-watch');
const path = require('path');
hardhat.hardhatArguments.network = 'localhost';
const node = hardhat.run('node');

waitOn({ resources: [hardhat.config.networks['localhost'].url] }).then(() => {
	hardhat.run('run', {
		script: join(__dirname, '../scripts/deploy.js'),
	});
});
watch(path.join(__dirname, '../contracts'), { recursive: true }, () => {
	hardhat.run('run', {
		script: join(__dirname, '../scripts/deploy.js'),
	});
});

module.exports = (router) => {
	router.use(
		'/hyperchain',
		createProxyMiddleware({
			target: hardhat.config.networks['localhost'].url,
			changeOrigin: true,
			followRedirects: true,
		})
	);
};
