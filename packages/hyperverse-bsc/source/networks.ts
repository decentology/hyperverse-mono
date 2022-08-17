import { Network, NetworkConfig } from "@decentology/hyperverse";

export const Networks : {[key in Network] : NetworkConfig} = {
	[Network.Mainnet]: {
		type: Network.Mainnet,
		name: 'mainnet',
		networkUrl: `https://bsc-dataseed.binance.org/`,
		chainId: 56,
		blockExplorer: 'https://bscscan.com/'
	},
	[Network.Testnet]: {
		type: Network.Testnet,
		name: 'bsc-testnet',
		chainId: 97,
		networkUrl: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
		blockExplorer: 'https://testnet.bscscan.com/',
	},
};
