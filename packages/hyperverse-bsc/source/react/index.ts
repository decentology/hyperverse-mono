import { useBSC } from './useBSC';
import Provider from './Provider';
import {Networks } from '../networks'
import { Blockchain, makeHyperverseBlockchain, Network } from '@decentology/hyperverse/react';
import "../styles.css"
export { Localhost } from '@decentology/hyperverse-evm/react'
const getNetwork = (network: Network) => {
	return Networks[network];
};

export const BSC = makeHyperverseBlockchain({
	name: Blockchain.BSC,
	Provider: Provider,
	getNetwork,
});

export { lightTheme, darkTheme } from '@decentology/hyperverse-evm/react';
export { Provider, useBSC, getNetwork, Networks };
