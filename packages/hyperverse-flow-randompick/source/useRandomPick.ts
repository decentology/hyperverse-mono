import { Network, useHyperverse } from '@decentology/hyperverse/react';
import { useEffect, useState } from 'react';
import { createContainer } from '@decentology/unstated-next';
import * as actions from './actions';
const fcl = require('@onflow/fcl');

function RandomPickState(initialState: { tenantId: string } = { tenantId: '' }) {
	const [isInitialized, setInitialized] = useState<boolean>(false);

	let { network } = useHyperverse();

	const tenantId = initialState.tenantId;
	const initialize = async () => {
		if (network.type === Network.Mainnet) {
			// TODO: Deploy to Flow Mainnet.
		} else if (network.type === Network.Testnet) {
			fcl.config().put('0xRandomPick', '0x3f55c5f48f39b076');
		}

		const RandomPickAddress = await fcl.config().get('0xRandomPick');
		if (typeof RandomPickAddress !== 'undefined') {
			setInitialized(true);
		} else {
			setInitialized(false);
		}
	};

	useEffect(() => {
		initialize();
	}, []);

	return {
		isInitialized,
		getRandomPick: actions.getRandomPick
	};
}

export const FlowRandomPickContainer = createContainer(RandomPickState);
export const Provider = FlowRandomPickContainer.Provider;
export function useRandomPick() {
	return FlowRandomPickContainer.useContainer();
}
