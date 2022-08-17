import { Network, NetworkConfig } from "@decentology/hyperverse";

export const Networks : {[key in Network] : NetworkConfig} = {
	[Network.Mainnet]: {
		type: Network.Mainnet,
		name: 'mainnet',
		networkUrl: 'https://api.avax.network/ext/bc/C/rpc',
		chainId: 43114,
		blockExplorer: 'https://snowtrace.io/'
	},
	[Network.Testnet]: {
		type: Network.Testnet,
		name: 'fuji',
		chainId: 43113,
		networkUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
		blockExplorer: 'https://testnet.snowtrace.io/',
	},
};
