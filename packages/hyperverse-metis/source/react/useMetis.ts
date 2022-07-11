import { createContainer, useContainer } from '@decentology/unstated-next';
import { useEvm } from '@decentology/hyperverse-evm/react';

function MetisState() {
	const state = useEvm();
	return {
		...state,
	};
}

export const Metis = createContainer(MetisState);
export const Provider = Metis.Provider;
export function useMetis() {
	return useContainer(Metis);
}
