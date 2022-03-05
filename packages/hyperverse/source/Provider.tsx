import { createElement, FC, useEffect, useState } from 'react';
import { Provider as SkyNetProvider } from '@decentology/hyperverse-storage-skynet';
import { Network, NetworkConfig } from './constants/networks';
import Storage from './constants/storage';
import { Hyperverse, HyperverseConfig } from './types';
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

const HyperverseContainer = createContainer(HyperverseState);
export function useHyperverse() {
	return HyperverseContainer.useContainer();
}

export const Provider: FC<{ initialState: Hyperverse }> = ({ children, initialState }) => {
	const [selectedBlockchain, setSelectedBlockchain] = useState<string | null>(
		initialState?.blockchain?.name || null
	);
	useEffect(() => {
		if (initialState.blockchain?.name && selectedBlockchain !== initialState.blockchain.name) {
			setSelectedBlockchain(initialState.blockchain.name);
			// Fire Event to disconect from old blockchain
		}
	}, [initialState.blockchain]);
	if (initialState.blockchain) {
		for (const module of initialState.modules.reverse()) {
			children = createElement(
				module.bundle.Provider,
				{
					tenantId: module.tenantId
				},
				children
			);
		}
	}

	const hyperverseConfig: HyperverseConfig = {
		...initialState,
		network:
			typeof initialState.network === 'string'
				? { type: initialState.network }
				: initialState.network
	};

	return (
		<HyperverseContainer.Provider initialState={hyperverseConfig}>
			<SkyNetProvider
				initialState={
					typeof initialState.storage === 'object'
						? { ...initialState.storage.options }
						: undefined
				}
			>
				{initialState.blockchain &&
				initialState.options?.disableProviderAutoInit !== false ? (
					<initialState.blockchain.Provider>{children}</initialState.blockchain.Provider>
				) : (
					children
				)}
			</SkyNetProvider>
		</HyperverseContainer.Provider>
	);
};
