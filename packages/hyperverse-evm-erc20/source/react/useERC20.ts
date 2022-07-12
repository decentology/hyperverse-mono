import { useState, useEffect, useCallback } from 'react';
import { useEvent } from 'react-use';
import { createContainer, useContainer } from '@decentology/unstated-next';
import { useHyperverse } from '@decentology/hyperverse/react';
import { useEvm } from '@decentology/hyperverse-evm/react';
import { ERC20Library, ERC20LibraryType } from '../erc20Library';

function ERC20State(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const { signer, readOnlyProvider } = useEvm();
	const hyperverse = useHyperverse();
	const [erc20Library, setERC20Library] = useState<ERC20LibraryType>();

	useEffect(() => {
		const lib = ERC20Library(hyperverse, signer || readOnlyProvider).then(setERC20Library).catch(x => {
			// Ignoring stale library instance
		});
		return lib.cancel;
	}, [signer, readOnlyProvider]);

	const useERC20Events = (eventName: string, callback: any) => {
		return useEvent(
			eventName,
			useCallback(callback, [erc20Library?.proxyContract]),
			erc20Library?.proxyContract
		);
	};

	return {
		...erc20Library,
		loading: !erc20Library,
		tenantId,
		useERC20Events,
	};
}

export const ERC20 = createContainer(ERC20State);

export function useERC20() {
	return useContainer(ERC20);
}
