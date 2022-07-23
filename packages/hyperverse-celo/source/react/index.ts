import { useCelo } from './useCelo';
import Provider from './Provider'
import { Blockchain, makeHyperverseBlockchain, Network } from '@decentology/hyperverse';
import { Networks } from '../networks';
import "../styles.css"
const getNetwork = (network: Network) => {
	return Networks[network];
}
export const Cello = makeHyperverseBlockchain({
	name: Blockchain.Ethereum,
	Provider: Provider,
	getNetwork
});
export { Localhost, lightTheme, darkTheme } from '@decentology/hyperverse-evm/react';
export { Provider, useCelo as useEthereum, getNetwork, Networks };
