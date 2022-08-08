import { useBSC } from './useBSC';
import Provider from './Provider';
import { Networks } from '../networks'
import { Blockchain, makeHyperverseBlockchain, Network } from '@decentology/hyperverse';
import "../styles.css"
const getNetwork = (network: Network) => {
	return Networks[network];
};

export const BSC = makeHyperverseBlockchain({
	name: Blockchain.BSC,
	Provider: Provider,
	getNetwork,
});

export const Localhost = makeHyperverseBlockchain({
	name: Blockchain.Localhost,
	Provider: Provider,
	getNetwork: () => {
		return {
			type: Network.Testnet,
			name: 'localhost',
			networkUrl: 'http://localhost:8545',
			chainId: 31337,
		};
	},
});
export { lightTheme, darkTheme } from '@decentology/hyperverse-evm/react';
export { Provider, useBSC, getNetwork, Networks };
