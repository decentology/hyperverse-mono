import { createElement, FC } from 'react';
import { Provider as SkyNetProvider } from '@decentology/hyperverse-storage-skynet';
import Network from './constants/networks';
import Storage from './constants/storage';
import { Hyperverse } from './types';
import { createContainer } from 'unstated-next';

function HyperverseState(
	initialState: Hyperverse = {
		blockchain: null,
		network: Network.Testnet,
		storage: Storage.Skynet,
		modules: [],
	}
) {
	return initialState;
}

const HyperverseContainer = createContainer(HyperverseState);
export function useHyperverse() {
	return HyperverseContainer.useContainer();
}

export const Provider: FC<{ initialState: Hyperverse }> = ({ children, initialState }) => {
	if (initialState.blockchain) {
		for (const module of initialState.modules.reverse()) {
			children = createElement(
				module.bundle.Provider,
				{
					tenantId: module.tenantId,
				},
				children
			);
		}

		return (
			<HyperverseContainer.Provider>
				<SkyNetProvider
					initialState={
						typeof initialState.storage === 'object'
							? { ...initialState.storage.options }
							: undefined
					}
				>
					<initialState.blockchain.Provider>{children}</initialState.blockchain.Provider>
				</SkyNetProvider>
			</HyperverseContainer.Provider>
		);
	}
	return null;
};
