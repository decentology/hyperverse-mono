import { useEvm } from './useEVM';
import { Provider, } from './Provider';
import { Blockchain, makeHyperverseBlockchain, Network } from '@decentology/hyperverse';
import { getProvider } from './evmLibraryBase';
export { EvmLibraryBase } from './evmLibraryBase';
// export { darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
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
	Provider: Provider,
	getNetwork,
});

export const Localhost = makeHyperverseBlockchain({
	name: Blockchain.Localhost,
	Provider: Provider,
	getNetwork,
});

export { Provider, useEvm, getProvider, };
