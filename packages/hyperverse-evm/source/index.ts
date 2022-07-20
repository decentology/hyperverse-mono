import { Blockchain, makeHyperverseBlockchain, Network } from '@decentology/hyperverse';
import { getProvider } from './evmLibraryBase';
import { Networks } from './networks';
export { EvmLibraryBase } from './evmLibraryBase';

const getNetwork = (network: Network) => {
	return Networks[network];
}

export const Localhost = makeHyperverseBlockchain({
	name: Blockchain.Localhost,
	getNetwork
});


export { getProvider };
