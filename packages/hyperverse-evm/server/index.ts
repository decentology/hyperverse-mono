import { Blockchain, makeHyperverseBlockchain, Network } from '@decentology/hyperverse';
export { EvmLibraryBase, getProvider } from '../source/evmLibraryBase';
const Networks = {
	[Network.Mainnet]: {
		type: Network.Mainnet,
		name: 'mainnet',
		networkUrl: 'http://localhost:8545',
		chainId: -1,
	},
	[Network.Testnet]: {
		type: Network.Mainnet,
		name: 'testnet',
		networkUrl: 'http://localhost:8545',
		chainId: 1337,
	},
};

const getNetwork = (network: Network) => {
	return Networks[network];
};

export const Ethereum = makeHyperverseBlockchain({
	name: Blockchain.Ethereum,
	// @ts-ignore
	Provider: null,
	getNetwork,
});

export const Localhost = makeHyperverseBlockchain({
	name: Blockchain.Localhost,
	// @ts-ignore
	Provider: null,
	getNetwork,
});
