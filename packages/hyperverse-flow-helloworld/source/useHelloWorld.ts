import { Network, useHyperverse } from '@decentology/hyperverse';
import { useEffect, useState } from 'react';
import { createContainer } from '@decentology/unstated-next';
import * as actions from './actions';
const fcl = require('@onflow/fcl');

function HelloWorldState(initialState: { tenantId: string } = { tenantId: '' }) {
	const [isInitialized, setInitialized] = useState<boolean>(false);

	let { network } = useHyperverse();

	const tenantId = initialState.tenantId;
	const initialize = async () => {
		if (network.type === Network.Mainnet) {
			// TODO: Deploy to Flow Mainnet.
		} else if (network.type === Network.Testnet) {
			fcl.config().put('0xHelloWorld', '0x3f55c5f48f39b076');
		}

		const HelloWorldAddress = await fcl.config().get('0xHelloWorld');
		if (typeof HelloWorldAddress !== 'undefined') {
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
		sayHello: actions.sayHello,
		changeHello: actions.changeHello
	};
}

export const FlowHelloWorldContainer = createContainer(HelloWorldState);
export const Provider = FlowHelloWorldContainer.Provider;
export function useHelloWorld() {
	return FlowHelloWorldContainer.useContainer();
}
