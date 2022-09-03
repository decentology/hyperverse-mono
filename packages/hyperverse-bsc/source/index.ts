import { Blockchain, makeHyperverseBlockchain, Network } from '@decentology/hyperverse';
import { Networks } from './networks';
export { Localhost } from '@decentology/hyperverse-evm'

const getNetwork = (network: Network) => {
	return Networks[network];
}
export const BSC = makeHyperverseBlockchain({
	name: Blockchain.BSC,
	label: 'Binance Smart Chain Mainnet',
	getNetwork
});

export { getNetwork, Networks };
