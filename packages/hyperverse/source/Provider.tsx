import { createElement, FC, useEffect, useState } from 'react';
import { Hyperverse, HyperverseConfig } from './types';
import { HyperverseContainer } from './useHyperverse';
import { Provider as IPFSProvider } from '@decentology/hyperverse-storage-ipfs';

export const Provider: FC<{ initialState: HyperverseConfig }> = ({ children, initialState }) => {
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
					tenantId: module.tenantId,
				},
				children
			);
		}
	}

	// TODO: Check storage configured through intirialize and set the correct provider
	// IPFS vs Skynet

	return (
		<HyperverseContainer.Provider initialState={initialState}>
			<IPFSProvider
				initialState={
					typeof initialState.storage === 'object'
						? { ...initialState.storage }
						: undefined
				}
			>
				{initialState.blockchain &&
				initialState.options?.disableProviderAutoInit !== true ? (
					<initialState.blockchain.Provider>{children}</initialState.blockchain.Provider>
				) : (
					children
				)}
			</IPFSProvider>
		</HyperverseContainer.Provider>
	);
};
