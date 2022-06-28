import { useState, useEffect, useCallback } from 'react';
import { useEvent } from 'react-use';
import { createContainer, useContainer } from '@decentology/unstated-next';

import { useHyperverse } from '@decentology/hyperverse';
import { useEvm } from '@decentology/hyperverse-evm';
import { NFTGameLibrary, NFTGameLibraryType } from './nftGameLibrary';

function NFTGameState(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const { signer, readOnlyProvider } = useEvm();
	const hyperverse = useHyperverse();
	const [nftGameLibrary, setNftGameLibrary] = useState<NFTGameLibraryType>();

	useEffect(() => {
		const lib = NFTGameLibrary(hyperverse, signer || readOnlyProvider).then(setNftGameLibrary).catch(x => {
			// Ignoring stale library instance
		});

		return lib.cancel;
	}, [signer, readOnlyProvider]);

	const useERC721Events = (eventName: string, callback: any) => {
		return useEvent(
			eventName,
			useCallback(callback, [nftGameLibrary?.proxyContract]),
			nftGameLibrary?.proxyContract
		);
	};

	return {
		...nftGameLibrary,
		loading: !nftGameLibrary,
		tenantId,
		useERC721Events,
	};
}

export const NFTGame = createContainer(NFTGameState);

export function useNFTGame() {
	return useContainer(NFTGame);
}
