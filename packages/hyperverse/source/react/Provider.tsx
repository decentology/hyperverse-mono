import {
	createElement as createElementLocal,
	FC,
	PropsWithChildren,
	useEffect,
	useState,
} from 'react';
import { Hyperverse, HyperverseConfig } from '../types';
import { HyperverseContainer, useHyperverse } from './useHyperverse';
import { Provider as IPFSProvider } from '@decentology/hyperverse-storage-ipfs';

export const Provider: FC<PropsWithChildren<{ initialState: HyperverseConfig }>> = ({
	children,
	initialState,
}) => {
	const [selectedBlockchain, setSelectedBlockchain] = useState<string | null>(
		initialState?.blockchain?.name || null
	);
	useEffect(() => {
		if (initialState.blockchain?.name && selectedBlockchain !== initialState.blockchain.name) {
			setSelectedBlockchain(initialState.blockchain.name);
			// Fire Event to disconect from old blockchain
		}
	}, [initialState.blockchain]);

	return (
		<HyperverseContainer.Provider initialState={initialState}>
			<InnerProvider>{children}</InnerProvider>
		</HyperverseContainer.Provider>
	);
};

const InnerProvider: FC<PropsWithChildren> = ({ children }) => {
	const initialState = useHyperverse();
	if (initialState.blockchain && !initialState.options?.disableProviderAutoInit) {
		// TODO: Override this initialState with the one that is updated.
		// How do we handle this?
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
		<>
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
		</>
	);
};
