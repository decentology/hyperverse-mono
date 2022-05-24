import { Network, useHyperverse } from '@decentology/hyperverse';
import { useEffect, useState } from 'react';
import { createContainer } from '@decentology/unstated-next';
import * as actions from './actions';
const fcl = require('@onflow/fcl');

function StorefrontState(initialState: { tenantId: string } = { tenantId: '' }) {
	const [isInitialized, setInitialized] = useState<boolean>(false);

	let { network } = useHyperverse();

	const tenantId = initialState.tenantId;
	const initialize = async () => {
		if (network.type === Network.Mainnet) {
			// TODO: Deploy to Flow Mainnet.
		} else if (network.type === Network.Testnet) {
			fcl.config().put('0xStorefront', '0x3f55c5f48f39b076');
		}

		const StorefrontAddress = await fcl.config().get('0xStorefront');
		if (typeof StorefrontAddress !== 'undefined') {
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
	};
}

export const FlowStorefrontContainer = createContainer(StorefrontState);
export const Provider = FlowStorefrontContainer.Provider;
export function useStorefront() {
	return FlowStorefrontContainer.useContainer();
}
