import { useState, useEffect, useCallback } from 'react';
import { useEvent } from 'react-use';
import { createContainer, useContainer } from '@decentology/unstated-next';
import { useEvm } from '@decentology/hyperverse-evm';
import { TribesLibrary, TribesLibraryType } from './tribesLibrary';
import { useHyperverse } from '@decentology/hyperverse';

function TribesState(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const { readOnlyProvider, signer } = useEvm();
	const hyperverse = useHyperverse();
	const [tribesLibrary, setTribesLibrary] = useState<TribesLibraryType>();

	console.log('tribes', signer);
	useEffect(() => {
		const lib = TribesLibrary(hyperverse, signer || readOnlyProvider).then(setTribesLibrary)
		return lib.cancel;
	}, [signer, readOnlyProvider])

	const useTribeEvents = (eventName: string, callback: any) => {
		return useEvent(
			eventName,
			useCallback(callback, [tribesLibrary?.proxyContract]),
			tribesLibrary?.proxyContract
		);
	};

	return {
		...tribesLibrary,
		loading: !tribesLibrary,
		tenantId,
		useTribeEvents,
	};
}

export const Tribes = createContainer(TribesState);

export function useTribes() {
	return useContainer(Tribes);
}
