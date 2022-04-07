import { Network, useHyperverse } from '@decentology/hyperverse';
import { useEffect, useState } from 'react';
import { createContainer } from '@decentology/unstated-next';
import * as actions from './actions';
const fcl = require('@onflow/fcl');

function BattleNikState(initialState: { tenantId: string } = { tenantId: '' }) {
	const [isInitialized, setInitialized] = useState<boolean>(false);

	let { network } = useHyperverse();

	const tenantId = initialState.tenantId;
	const initialize = async () => {
		if (network.type === Network.Mainnet) {
			// TODO: Deploy to Flow Mainnet.
		} else if (network.type === Network.Testnet) {
			fcl.config().put('0xBattleNik', '0x3f55c5f48f39b076');
		}

		const BattleNikAddress = await fcl.config().get('0xBattleNik');
		if (typeof BattleNikAddress !== 'undefined') {
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
		battleNik: actions.battleNik
	};
}

export const FlowBattleNikContainer = createContainer(BattleNikState);
export const Provider = FlowBattleNikContainer.Provider;
export function useBattleNik() {
	return FlowBattleNikContainer.useContainer();
}
