import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient, UseMutationOptions } from 'react-query';
import { useEvent } from 'react-use';
import { createContainer, useContainer } from '@decentology/unstated-next';
import { useEvm } from '@decentology/hyperverse-evm';
import { MetaData } from './types';
import { TribesLibrary, TribesLibraryType } from './library/TribesLibrary';
import { useHyperverse } from '@decentology/hyperverse';

function TribesState(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const queryClient = useQueryClient();
	const { address, connectedProvider, readOnlyProvider } = useEvm();
	const hyperverse = useHyperverse();
	const [tribesLibrary, setTribesLibrary] = useState<TribesLibraryType>();

	useEffect(() => {
		let cancel = false;
		TribesLibrary(hyperverse, connectedProvider || readOnlyProvider).then((result) => {
			if(!cancel) {
				setTribesLibrary(result);
			}
		});
		return () => {
			cancel = true;
		}
	}, [ connectedProvider])

	if(typeof window !=='undefined') {
		// @ts-ignore
		window['tribesLibrary'] = tribesLibrary;
	}
	const useTribeEvents = (eventName: string, callback: any) => {
		return useEvent(eventName, useCallback(callback, [tribesLibrary?.proxyContract]), tribesLibrary?.proxyContract);
	};



	return {
		tenantId,
		factoryContract: tribesLibrary?.factoryContract,
		proxyContract: tribesLibrary?.proxyContract,
		useTribeEvents,
		CheckInstance: () => useQuery(['checkInstance', address,], () => tribesLibrary?.checkInstance(address), { enabled: !!tribesLibrary }),
		NewInstance: (
			options?: Omit<
				UseMutationOptions<unknown, unknown, { account: string }, unknown>,
				'mutationFn'
			>
		) => useMutation(({ account }) => tribesLibrary!.createInstance(account), options),
		TotalTenants: () => useQuery(['totalTenants',], () => tribesLibrary?.getTotalTenants(), { enabled: !!tribesLibrary }),
		AddTribe: (
			options?: Omit<
				UseMutationOptions<
					unknown,
					unknown,
					{ metadata: Omit<MetaData, 'image'>; image: File },
					unknown
				>,
				'mutationFn'
			>
		) =>
			useMutation(
				(payload) => tribesLibrary!.addTribe(payload.metadata, payload.image),
				options
			),
		Tribes: () => useQuery(['tribes'], () => tribesLibrary!.getAllTribes(), {
			enabled: !!tribesLibrary,
		}),
		Join: (options?: Omit<UseMutationOptions<unknown, unknown, unknown, unknown>, 'mutationFn'>
		) => useMutation((id: number) => tribesLibrary!.joinTribe(id), options),
		Leave: (
			options?: Omit<UseMutationOptions<unknown, unknown, void, unknown>, 'mutationFn'>
		) =>
			useMutation(() => tribesLibrary!.leaveTribe(), {
				...options,
				onSuccess: (...args) => {
					queryClient.clear();
					const fn = options?.onSuccess;
					if (fn) fn(...args);
				},
			}),
		TribeId: () => useQuery(['getTribeId', address,], () => tribesLibrary?.getTribeId(address!), { enabled: !!tribesLibrary }),
		Tribe: () => {
			const { data: tribeId } = useQuery(['getTribeId', address,], () => tribesLibrary?.getTribeId(address!),
				{ enabled: !!tribesLibrary }
			);
			return useQuery(['getTribeData', tribeId], () => tribesLibrary?.getTribe(tribeId),);
		},
		TribeMembers: (tribeId: number) => useQuery(['getTribeMembers',], () => tribesLibrary?.getTribeMembers(tribeId),),
	};
}

export const Tribes = createContainer(TribesState);

export function useTribes() {
	return useContainer(Tribes);
}
