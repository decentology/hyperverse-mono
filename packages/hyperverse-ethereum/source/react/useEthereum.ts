import { createContainer, useContainer } from '@decentology/unstated-next';
import { useEvm } from '@decentology/hyperverse-evm/react';

function EthereumState() {
	const state = useEvm();
	return {
		...state,
	};
}

export const Ethereum = createContainer(EthereumState);
export const Provider = Ethereum.Provider;
export function useEthereum() {
	return useContainer(Ethereum);
}
