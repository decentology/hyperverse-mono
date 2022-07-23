import { useMetis } from './useMetis';
import Provider from './Provider';
import { Networks as Networks } from '../networks'
import { Blockchain, makeHyperverseBlockchain, Network } from '@decentology/hyperverse';

import "../styles.css"
const getNetwork = (network: Network) => {
	return Networks[network];
};
export const Metis = makeHyperverseBlockchain({
	name: Blockchain.Ethereum,
	Provider: Provider,
	getNetwork,
});
export { Localhost, lightTheme, darkTheme } from '@decentology/hyperverse-evm/react';
export { Provider, useMetis, getNetwork, Networks };
