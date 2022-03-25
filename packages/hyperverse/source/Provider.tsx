import { createElement, FC, useEffect, useState } from 'react';
import { Hyperverse, HyperverseConfig } from './types';
import { HyperverseContainer } from './useHyperverse';
import { Provider as SkyNetProvider } from '@decentology/hyperverse-storage-skynet';

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
	if (initialState.blockchain && !initialState.options?.disableProviderAutoInit) {
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
				initialState.options?.disableProviderAutoInit !== true ? (
					<initialState.blockchain.Provider>{children}</initialState.blockchain.Provider>
				) : (
					children
				)}
			</SkyNetProvider>
		</HyperverseContainer.Provider>
	);
};
