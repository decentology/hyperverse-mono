import { Network, useHyperverse } from '@decentology/hyperverse';
import { useEffect, useState } from 'react';
import { createContainer } from '@decentology/unstated-next';
import * as actions from './actions';
const fcl = require('@onflow/fcl');

function TokenState(initialState: { tenantId: string } = { tenantId: '' }) {
	const [isInitialized, setInitialized] = useState<boolean>(false);

	let { network } = useHyperverse();

	const tenantId = initialState.tenantId;
	const initialize = async () => {
		if (network.type === Network.Mainnet) {
			// TODO: Deploy to Flow Mainnet.
		} else if (network.type === Network.Testnet) {
			fcl.config().put('0xToken', 'FILL THIS IN');
		}

		const TokenAddress = await fcl.config().get('0xToken');
		if (typeof TokenAddress !== 'undefined') {
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
		// leaveTribe: actions.leaveTribe.bind(null, tenantId),
		// getAllTribes: actions.getAllTribes.bind(null, tenantId),
		// getCurrentTribe: actions.getCurrentTribe.bind(null, tenantId),
		// joinTribe: actions.joinTribe.bind(null, tenantId),
		// createTenant: actions.createTenant,
		// addTribe: actions.addTribe,
	};
}

export const FlowTokenContainer = createContainer(TokenState);
export const Provider = FlowTokenContainer.Provider;
export function useToken() {
	return FlowTokenContainer.useContainer();
}
