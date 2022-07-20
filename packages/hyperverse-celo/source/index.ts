import { Blockchain, makeHyperverseBlockchain, Network } from '@decentology/hyperverse';
import { Networks } from './networks';

const getNetwork = (network: Network) => {
	return Networks[network];
}
export const Cello = makeHyperverseBlockchain({
	name: Blockchain.Ethereum,
	getNetwork
});
export { Localhost, } from '@decentology/hyperverse-evm';
export { getNetwork, Networks };
