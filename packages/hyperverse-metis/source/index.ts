import { Blockchain, makeHyperverseBlockchain, Network } from '@decentology/hyperverse';
import { Networks } from './networks';

const getNetwork = (network: Network) => {
	return Networks[network];
}
export const Metis = makeHyperverseBlockchain({
	name: Blockchain.Metis,
	getNetwork: 
});

export { getNetwork, Networks };
