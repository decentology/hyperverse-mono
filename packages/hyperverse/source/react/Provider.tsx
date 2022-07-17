import { createElement as createElementLocal, FC, useEffect, useState } from 'react';
import { Hyperverse, HyperverseConfig } from '../types';
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
			children = createElementLocal(
				module.bundle.Provider!,
				{
					tenantId: module.tenantId,
				},
				children
			);
		}
	}

	return (
		<HyperverseContainer.Provider initialState={initialState}>
			{initialState.options?.disableProviderAutoInit !== true ? (
				<IPFSProvider
					initialState={
						typeof initialState.storage === 'object'
							? { ...initialState.storage }
							: undefined
					}
				>
					{initialState.blockchain && initialState.blockchain.Provider ? (
						<initialState.blockchain.Provider>
							{children}
						</initialState.blockchain.Provider>
					) : (
						children
					)}
				</IPFSProvider>
			) : (
				children
			)}
		</HyperverseContainer.Provider>
	);
};
