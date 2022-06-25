const { createProxyMiddleware } = require('http-proxy-middleware');
const hardhat = require('hardhat');
const { join } = require('path');
const waitOn = require('wait-on');
const watch = require('node-watch');
const path = require('path');
const { spawn } = require('child_process');
hardhat.hardhatArguments.network = 'localhost';
const node = hardhat.run('node');

waitOn({ resources: [hardhat.config.networks['localhost'].url] }).then(deploy);
watch(path.join(__dirname, '../contracts'), { recursive: true }, deploy);

function deploy() {
	try {
		const deployer = spawn(
			'hardhat',
			['run', join(__dirname, '../scripts/deploy.js'), '--network', 'localhost'],
			{
				shell: true,
				env: {
					...process.env,
					LOCALDEPLOY: true,
				},
				stdio: 'inherit',
			}
		);
		deployer.stderr.on('data', (data) => {
			console.error(data.toString());
		});
		deployer.stdio.on('data', (data) => {
			console.log(data.toString());
		});
	} catch (error) {}
}

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
