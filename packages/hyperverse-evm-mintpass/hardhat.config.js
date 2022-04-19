require('dotenv').config();
require('@nomiclabs/hardhat-waffle');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const accounts = process.env.NEXT_PRIVATE_KEY !== undefined ? [process.env.NEXT_PRIVATE_KEY] : [];

module.exports = {
	solidity: '0.8.4',
	defaultNetwork: 'hardhat',
	networks: {
		hardhat: {},
		ethereum: {
			url: `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
			accounts,
		},
		metis: {
			url: 'https://stardust.metis.io/?owner=588',
			accounts,
		},
		avalanche: {
			url: 'https://api.avax-test.network/ext/bc/C/rpc',
			accounts,
		},
		polygon: {
			url: 'https://rpc-mumbai.maticvigil.com',
			accounts,
		},
	},
};
