import { Network } from './constants/networks';
import Storage from './constants/storage';
import { HyperverseConfig } from './types';
import { createContainer } from '@decentology/unstated-next';

function HyperverseState(
	initialState: HyperverseConfig = {
		blockchain: null,
		network: {
			type: Network.Testnet
		},
		storage: Storage.Skynet,
		modules: []
	}
) {
	return initialState;
}

export const HyperverseContainer = createContainer(HyperverseState);
export function useHyperverse() {
	return HyperverseContainer.useContainer();
}
