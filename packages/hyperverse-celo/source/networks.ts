import { Network, NetworkConfig } from "@decentology/hyperverse";

export const Networks : {[key in Network] : NetworkConfig} = {
	[Network.Mainnet]: {
		type: Network.Mainnet,
		name: 'mainnet',
		networkUrl: `https://forno.celo.org`,
		chainId: 42220,
		blockExplorer: 'https://explorer.celo.org',
	},
	[Network.Testnet]: {
		type: Network.Testnet,
		name: 'alfajores',
		chainId: 44787,
		networkUrl: `https://alfajores-forno.celo-testnet.org`,
		blockExplorer: 'https://alfajores-blockscout.celo-testnet.org',
	},
};
