import { Provider, usePolygon } from './usePolygon';
import { Blockchain, makeHyperverseBlockchain, Network } from '@decentology/hyperverse';
import { Networks } from '../networks';
export { Localhost, lightTheme, darkTheme } from '@decentology/hyperverse-evm/react';
const getNetwork = (network: Network) => {
	return Networks[network];
};
export const Polygon = makeHyperverseBlockchain({
	name: Blockchain.Polygon,
	Provider: Provider,
	getNetwork
});

export { Provider, usePolygon, getNetwork, Networks };
