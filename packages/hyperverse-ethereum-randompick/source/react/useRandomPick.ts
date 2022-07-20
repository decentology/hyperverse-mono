import { useState, useEffect, useCallback } from 'react';
import { useEvent } from 'react-use';
import { useEvm } from '@decentology/hyperverse-evm/react';
import { createContainer, useContainer } from '@decentology/unstated-next';
import { useEnvironment } from './environment';
import { useHyperverse } from '@decentology/hyperverse/react';
import { RandomPickLibrary, RandomPickType } from '../randomPickLibrary';

function RandomPickState(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const { address, signer, readOnlyProvider } = useEvm();
	const { ContractABI, contractAddress } = useEnvironment();

	const hyperverse = useHyperverse();
	const [randomPickLibrary, setRandomPickLibrary] = useState<RandomPickType>();

	useEffect(() => {
		const lib = RandomPickLibrary(hyperverse, signer || readOnlyProvider).then(setRandomPickLibrary).catch(x => {
			// Ignoring stale library instance
		});
		return lib.cancel;
	}, [signer, readOnlyProvider]);

	const useRandomPickEvents = (eventName: string, callback: any) => {
		return useEvent(
			eventName,
			useCallback(callback, [randomPickLibrary?.contract]),
			randomPickLibrary?.contract
		);
	}

	return {
		tenantId,
		useRandomPickEvents,
		loading: !randomPickLibrary,
		...randomPickLibrary,
	};
}

export const RandomPick = createContainer(RandomPickState);

export function useRandomPick() {
	return useContainer(RandomPick);
}
