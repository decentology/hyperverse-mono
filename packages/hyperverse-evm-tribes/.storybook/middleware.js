const hardhat = require('hardhat');
const node = hardhat.run('node');
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = router => {
	router.use(
		'/hyperchain',
		createProxyMiddleware({
			target: 'http://localhost:8545',
			changeOrigin: true,
			followRedirects: true
		})
	);
};
