import { useState, useEffect, useCallback } from 'react';
import { useEvent } from 'react-use';
import { createContainer, useContainer } from '@decentology/unstated-next';

import { useEvm } from '@decentology/hyperverse-evm';
import { ERC777Library, ERC777LibraryType } from './erc777Library';
import { useHyperverse } from '@decentology/hyperverse';

function ERC777State(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const { readOnlyProvider, signer } = useEvm();
	const hyperverse = useHyperverse();
	const [erc777Library, setERC777Library] = useState<ERC777LibraryType>();


	useEffect(() => {
		const lib = ERC777Library(hyperverse, signer || readOnlyProvider).then(setERC777Library)
		return lib.cancel;
	}, [signer, readOnlyProvider])

	const useERC777Events = (eventName: string, callback: any) => {
		return useEvent(
			eventName,
			useCallback(callback, [erc777Library?.proxyContract]),
			erc777Library?.proxyContract
		);
	};

	return {
		...erc777Library,
		loading: !erc777Library,
		tenantId,
		useERC777Events,
	};
}

export const ERC777 = createContainer(ERC777State);

export function useERC777() {
	return useContainer(ERC777);
}
