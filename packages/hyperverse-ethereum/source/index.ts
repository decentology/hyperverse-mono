import { Blockchain, makeHyperverseBlockchain, Network } from '@decentology/hyperverse';
import { Networks } from './networks';
export { Localhost } from '@decentology/hyperverse-evm'

const getNetwork = (network: Network) => {
	return Networks[network];
}
export const Ethereum = makeHyperverseBlockchain({
	name: Blockchain.Ethereum,
	getNetwork
});

export { getNetwork, Networks };
