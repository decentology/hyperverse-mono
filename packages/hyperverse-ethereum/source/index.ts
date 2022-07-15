import { Blockchain, makeHyperverseBlockchain, Network } from '@decentology/hyperverse';
import { Networks } from './networks';

const getNetwork = (network: Network) => {
	return Networks[network];
}
export const Ethereum = makeHyperverseBlockchain({
	name: Blockchain.Ethereum,
	getNetwork
});
export const Localhost = makeHyperverseBlockchain({
	name: Blockchain.Localhost,
	getNetwork
});
export { getNetwork, Networks };
