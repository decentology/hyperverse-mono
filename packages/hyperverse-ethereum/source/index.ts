import { useEthereum } from './useEthereum';
import Provider, { Networks } from './Provider'
import { Blockchain, makeHyperverseBlockchain, Network } from '@decentology/hyperverse';

const getNetwork = (network: Network) => {
	return Networks[network];
}
export const Ethereum = makeHyperverseBlockchain({
	name: Blockchain.Ethereum,
	Provider: Provider,
	getNetwork
});


export { Provider, useEthereum, getNetwork , Networks};
