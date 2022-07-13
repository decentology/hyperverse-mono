import { useState, useEffect, useCallback } from 'react';
import { useEvent } from 'react-use';
import { createContainer, useContainer } from '@decentology/unstated-next';
import { useHyperverse } from '@decentology/hyperverse/react';
import { useEvm } from '@decentology/hyperverse-evm/react';
import { ERC721Library, ERC721LibraryType } from '../erc721Library';

function ERC721State(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const { signer, readOnlyProvider } = useEvm();
	const hyperverse = useHyperverse();
	const [erc721Library, setERC721Library] = useState<ERC721LibraryType>();

	useEffect(() => {
		const lib = ERC721Library(hyperverse, signer || readOnlyProvider).then(setERC721Library).catch(x => {
			// Ignoring stale library instance
		});
		
		return lib.cancel;
	}, [signer, readOnlyProvider]);

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
