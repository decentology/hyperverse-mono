import { useCelo } from './useCelo';
import Provider, { Networks } from './Provider'
import { Blockchain, makeHyperverseBlockchain, Network } from '@decentology/hyperverse';

const getNetwork = (network: Network) => {
	return Networks[network];
}
export const Cello = makeHyperverseBlockchain({
	name: Blockchain.Ethereum,
	Provider: Provider,
	getNetwork
});
export { Localhost, lightTheme, darkTheme } from '@decentology/hyperverse-evm';
export { Provider, useCelo as useEthereum, getNetwork, Networks };
