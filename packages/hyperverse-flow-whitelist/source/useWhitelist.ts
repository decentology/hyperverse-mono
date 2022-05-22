import { Network, useHyperverse } from '@decentology/hyperverse';
import { useEffect, useState } from 'react';
import { createContainer } from '@decentology/unstated-next';
import * as actions from './actions';
const fcl = require('@onflow/fcl');

function WhitelistState(initialState: { tenantId: string } = { tenantId: '' }) {
	const [isInitialized, setInitialized] = useState<boolean>(false);

	let { network } = useHyperverse();

	const tenantId = initialState.tenantId;
	const initialize = async () => {
		if (network.type === Network.Mainnet) {
			// TODO: Deploy to Flow Mainnet.
		} else if (network.type === Network.Testnet) {
			fcl.config().put('0xWhitelist', '0x3f55c5f48f39b076');
		}

		const WhitelistAddress = await fcl.config().get('0xWhitelist');
		if (typeof WhitelistAddress !== 'undefined') {
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

export const FlowWhitelistContainer = createContainer(WhitelistState);
export const Provider = FlowWhitelistContainer.Provider;
export function useWhitelist() {
	return FlowWhitelistContainer.useContainer();
}
