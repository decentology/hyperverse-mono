import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, UseMutationOptions } from 'react-query';
import { useEvent } from 'react-use';
import { useHyperverse } from '@decentology/hyperverse';
import { useEvm } from '@decentology/hyperverse-evm';
import { createContainer, useContainer } from '@decentology/unstated-next';
import { WhitelistLibrary, WhitelistLibraryType } from './whitelistlibrary';

function WhitelistState(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const { address, connectedProvider, readOnlyProvider } = useEvm();
	const hyperverse = useHyperverse();
	const [whitelistLibrary, setWhitelistLibrary] = useState<WhitelistLibraryType>();

	useEffect(() => {
		const lib = WhitelistLibrary(hyperverse, connectedProvider || readOnlyProvider).then(setWhitelistLibrary)
		return lib.cancel;
	}, [connectedProvider])

	const useWhitelistEvents = (eventName: string, callback: any) => {
		return useEvent(
			eventName,
			useCallback(callback, [whitelistLibrary?.proxyContract]),
			whitelistLibrary?.proxyContract
		);
	};

	return {
		...whitelistLibrary,
		tenantId,
		loading: !whitelistLibrary,
		useWhitelistEvents,
	};
}

export const Whitelist = createContainer(WhitelistState);

export function useWhitelist() {
	return useContainer(Whitelist);
}
