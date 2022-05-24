import { useState, useEffect, useCallback } from 'react';
import { useEvent } from 'react-use';
import { createContainer, useContainer } from '@decentology/unstated-next';

import { useHyperverse } from '@decentology/hyperverse';
import { useEvm } from '@decentology/hyperverse-evm';
import { ERC721Library, ERC721LibraryType } from './erc721Library';

function ERC721State(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const { connectedProvider, readOnlyProvider } = useEvm();
	const hyperverse = useHyperverse();
	const [erc721Library, setERC721Library] = useState<ERC721LibraryType>();

	useEffect(() => {
		const lib = ERC721Library(hyperverse, connectedProvider || readOnlyProvider).then(
			setERC721Library
		);
		return lib.cancel;
	}, [connectedProvider]);

	const useERC721Events = (eventName: string, callback: any) => {
		return useEvent(
			eventName,
			useCallback(callback, [erc721Library?.proxyContract]),
			erc721Library?.proxyContract
		);
	};

	return {
		...erc721Library,
		loading: !erc721Library,
		tenantId,
		useERC721Events,
	};
}

export const ERC721 = createContainer(ERC721State);

export function useERC721() {
	return useContainer(ERC721);
}
