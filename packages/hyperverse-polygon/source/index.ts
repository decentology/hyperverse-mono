import { Blockchain, makeHyperverseBlockchain, Network } from '@decentology/hyperverse';
import { Networks } from './networks';

const getNetwork = (network: Network) => {
	return Networks[network];
}
export const Polygon = makeHyperverseBlockchain({
	name: Blockchain.Polygon,
});


export { getNetwork, Networks };
