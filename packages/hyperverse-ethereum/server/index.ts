import { Blockchain, makeHyperverseBlockchain, Network } from '@decentology/hyperverse';
import { Networks } from '../source/networks';

const getNetwork = (network: Network) => {
	return Networks[network];
};
export const Ethereum = makeHyperverseBlockchain({
	name: Blockchain.Ethereum,
	// @ts-ignore
	Provider: null,
	getNetwork,
});
export { Localhost } from '@decentology/hyperverse-evm/server';
export { getNetwork, Networks };
