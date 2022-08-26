import { Network } from '../constants/networks';
import { HyperverseConfig } from '../types';
import { createContainer } from '@decentology/unstated-next';
import { useState } from 'react';

function HyperverseState(
	initialState: HyperverseConfig = {
		blockchain: null,
		network: {
			type: Network.Testnet,
		},
		modules: [],
	}
) {
	const [state, setState] = useState<
		HyperverseConfig & {
			setModulesTenantId: (tenantId: string) => void;
		}
	>({
		...initialState,
		setModulesTenantId: (tenantId: string) => {
			setState((state) => ({
				...state,
				modules: state.modules.map((module) => ({
					...module,
					tenantId,
				})),
			}));
		},
	});

	return {
		...state,
	};
}

export const HyperverseContainer = createContainer(HyperverseState);
export function useHyperverse() {
	return HyperverseContainer.useContainer();
}
