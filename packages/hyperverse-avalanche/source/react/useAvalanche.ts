import { createContainer, useContainer } from '@decentology/unstated-next';
import { useEvm } from '@decentology/hyperverse-evm/react';

function AvalancheState() {
	const state = useEvm();
	return {
		...state,
	};
}

export const Avalanche = createContainer(AvalancheState);
export const Provider = Avalanche.Provider;
export function useAvalanche() {
	return useContainer(Avalanche);
}
