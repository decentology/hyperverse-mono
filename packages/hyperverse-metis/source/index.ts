export * from '@decentology/web3modal';
import { useMetis } from './useMetis';
import Provider, { NETWORKS } from './Provider';
import { Blockchain, makeHyperverseBlockchain, Network } from '@decentology/hyperverse';

export const Metis = makeHyperverseBlockchain({
	name: Blockchain.Metis,
	Provider: Provider,
	getNetwork: (network: Network) => {
		return NETWORKS[network];
	}
});

export { Provider, useMetis };
