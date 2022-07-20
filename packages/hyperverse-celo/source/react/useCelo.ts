import { createContainer, useContainer } from '@decentology/unstated-next';
import { useEvm } from '@decentology/hyperverse-evm/react';

function CeloState() {
	const state = useEvm();
	return {
		...state,
	};
}

export const Celo = createContainer(CeloState);
export const Provider = Celo.Provider;
export function useCelo() {
	return useContainer(Celo);
}
