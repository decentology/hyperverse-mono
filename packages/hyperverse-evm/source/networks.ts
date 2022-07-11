import { Network } from "@decentology/hyperverse";

export const Networks = {
	[Network.Mainnet]: {
		type: Network.Mainnet,
		name: 'mainnet',
		networkUrl: 'http://localhost:8545',
		chainId: -1,
	},
	[Network.Testnet]: {
		type: Network.Testnet,
		name: 'testnet',
		networkUrl: 'http://localhost:8545',
		chainId: 31337,
	},
};
