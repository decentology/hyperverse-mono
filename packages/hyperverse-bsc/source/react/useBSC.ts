import { createContainer, useContainer } from '@decentology/unstated-next';
import { useEvm } from '@decentology/hyperverse-evm/react';

function BSCState() {
	const state = useEvm();
	return {
		...state,
	};
}

export const BSC = createContainer(BSCState);
export const Provider = BSC.Provider;
export function useBSC() {
	return useContainer(BSC);
}
