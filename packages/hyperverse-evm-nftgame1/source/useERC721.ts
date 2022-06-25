import { useState, useEffect, useCallback } from 'react';
import { useEvent } from 'react-use';
import { createContainer, useContainer } from '@decentology/unstated-next';
import { useHyperverse } from '@decentology/hyperverse';
import { useEvm } from '@decentology/hyperverse-evm';
import { NFTGame1Library, NFTGame1LibraryType } from './nftGame1Library';

function NFTGame1State(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const { signer, readOnlyProvider } = useEvm();
	const hyperverse = useHyperverse();
	const [nftGame1Library, setNFTGame1Library] = useState<NFTGame1LibraryType>();

	useEffect(() => {
		const lib = NFTGame1Library(hyperverse, signer || readOnlyProvider).then(setNFTGame1Library).catch(x => {
			// Ignoring stale library instance
		});
		return lib.cancel;
	}, [signer, readOnlyProvider]);

	const useNFTGame1Events = (eventName: string, callback: any) => {
		return useEvent(
			eventName,
			useCallback(callback, [nftGame1Library?.proxyContract]),
			nftGame1Library?.proxyContract
		);
	};

	return {
		...nftGame1Library,
		loading: !nftGame1Library,
		tenantId,
		useNFTGame1Events,
	};
}

export const NFTGame1 = createContainer(NFTGame1State);

export function useNFTGame1() {
	return useContainer(NFTGame1);
}
