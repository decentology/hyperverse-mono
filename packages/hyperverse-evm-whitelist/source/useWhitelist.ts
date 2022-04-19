import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, UseMutationOptions } from 'react-query';
import { useEvent } from 'react-use';
import { useHyperverse } from '@decentology/hyperverse';
import { createContainer, useContainer } from '@decentology/unstated-next';
import { useEvm } from '@decentology/hyperverse-evm';
import { WhitelistLibrary, WhitelistLibraryType } from './library/WhitelistLibrary';

function WhitelistState(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const { address, connectedProvider, readOnlyProvider } = useEvm();
	const hyperverse = useHyperverse();
	const [whitelistLibrary, setWhitelistLibrary] = useState<WhitelistLibraryType>();

	useEffect(() => {
		let canel = false;
		WhitelistLibrary(hyperverse, connectedProvider || readOnlyProvider).then((result) => {
			if (!canel) {
				setWhitelistLibrary(result);
			}
		});
		return () => {
			canel = true;
		};
	}, [connectedProvider]);

	if (typeof window !== 'undefined') {
		// @ts-ignore
		window['whitelistLibrary'] = whitelistLibrary;
	}

	const useWhitelistEvents = (eventName: string, callback: any) => {
		return useEvent(
			eventName,
			useCallback(callback, [whitelistLibrary?.proxyContract]),
			whitelistLibrary?.proxyContract
		);
	};

	return {
		tenantId,
		factoryContract: whitelistLibrary?.factoryContract,
		proxyContract: whitelistLibrary?.proxyContract,
		useWhitelistEvents,
		CheckInstance: () =>
			useQuery(['checkInstance', address], () => whitelistLibrary?.checkInstance(address), {
				enabled: !!whitelistLibrary,
			}),

		NewInstance: (
			options?: Omit<
				UseMutationOptions<
					unknown,
					unknown,
					{
						account: string;
						startTime?: number;
						endTime?: number;
						units?: number;
						erc721?: string;
						erc20?: string;
						merkleRoot?: string;
					},
					unknown
				>,
				'mutationFn'
			>
		) => useMutation(({ account }) => whitelistLibrary!.createInstance(account), options),
		TotalTenants: () => useQuery(['totalTenants',], () => whitelistLibrary?.getTotalTenants(), { enabled: !!whitelistLibrary }),
	
	};
}

export const Whitelist = createContainer(WhitelistState);

export function useWhitelist() {
	return useContainer(Whitelist);
}
