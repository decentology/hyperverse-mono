import { Network, NetworkConfig } from "@decentology/hyperverse";

const INFURA_ID = globalThis.process?.env?.INFURA_API_KEY! || 'fb9f66bab7574d70b281f62e19c27d49';
export const Networks: { [key in Network]: NetworkConfig } = {
	[Network.Mainnet]: {
		type: Network.Mainnet,
		name: 'mainnet',
		networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
		providerId: INFURA_ID,
		chainId: 1,
	},
	[Network.Testnet]: {
		type: Network.Testnet,
		name: 'rinkeby',
		chainId: 4,
		providerId: INFURA_ID,
		networkUrl: `https://goerli.infura.io/v3/${INFURA_ID}`,
		blockExplorer: 'https://goerli.etherscan.io',
	},
};
