import { Blockchain, makeHyperverseBlockchain, Network } from '@decentology/hyperverse';
import { NETWORKS } from './networks';

export const Metis = makeHyperverseBlockchain({
	name: Blockchain.Metis,
	getNetwork: (network: Network) => {
		return NETWORKS[network];
	}
});
