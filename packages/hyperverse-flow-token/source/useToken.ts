import { Network, useHyperverse } from '@decentology/hyperverse/react';
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
			fcl.config().put('0xToken', '0x3f55c5f48f39b076');
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
		transferToken: actions.transferToken.bind(null, tenantId),
		setup: actions.setup,
		mintToken: actions.mintToken,
		getTotalSupply: actions.getTotalSupply.bind(null, tenantId),
		getBalance: actions.getBalance.bind(null, tenantId)
	};
}

export const FlowTokenContainer = createContainer(TokenState);
export const Provider = FlowTokenContainer.Provider;
export function useToken() {
	return FlowTokenContainer.useContainer();
}
