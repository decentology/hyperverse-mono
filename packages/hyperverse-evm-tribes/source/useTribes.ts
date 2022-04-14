import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient, UseMutationOptions } from 'react-query';
import { ethers } from 'ethers';
import { useEvent } from 'react-use';
import { useStorage } from '@decentology/hyperverse-storage-skynet';
import { createContainer, useContainer } from '@decentology/unstated-next';
import { useEvm } from '@decentology/hyperverse-evm';
import { MetaData } from './types';
import { TribesLibrary } from './library/TribesLibrary';
import { useHyperverse } from '@decentology/hyperverse';
import { Web3Provider } from '@ethersproject/providers';

function TribesState(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const queryClient = useQueryClient();
	const { address, connectedProvider, readOnlyProvider } = useEvm();
	const hyperverse = useHyperverse();
	const [tribesLibrary, setTribesLibrary] = useState<TribesLibrary>(
		new TribesLibrary(hyperverse, connectedProvider || readOnlyProvider)
	);


	useEffect(() => {
		const provider = connectedProvider || readOnlyProvider;
		let signer: ethers.Signer | undefined;
		if (provider instanceof Web3Provider) {
			signer = provider.getSigner()
		}
		setTribesLibrary(
			new TribesLibrary(hyperverse, signer || provider)

		)
	}, [readOnlyProvider, connectedProvider])


	const useTribeEvents = (eventName: string, callback: any) => {
		return useEvent(eventName, useCallback(callback, [tribesLibrary.proxyContract]), tribesLibrary.proxyContract);
	};

	return {
		tenantId,
		factoryContract: tribesLibrary.factoryContract,
		proxyContract: tribesLibrary.proxyContract,
		useTribeEvents,
		CheckInstance: () => useQuery(['checkInstance', address,], () => tribesLibrary.checkInstance(address),),
		NewInstance: (
			options?: Omit<
				UseMutationOptions<unknown, unknown, { account: string }, unknown>,
				'mutationFn'
			>
		) => useMutation(({ account }) => tribesLibrary.createInstance(account), options),
		TotalTenants: () => useQuery(['totalTenants',], () => tribesLibrary.getTotalTenants(),),
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
				(payload) => tribesLibrary.addTribe(payload.metadata, payload.image),
				options
			),
		Tribes: () => useQuery(['tribes'], tribesLibrary.getAllTribes,),
		Join: (options?: Omit<UseMutationOptions<unknown, unknown, unknown, unknown>, 'mutationFn'>
		) => useMutation((id: number) => tribesLibrary.joinTribe(id), options),
		Leave: (
			options?: Omit<UseMutationOptions<unknown, unknown, void, unknown>, 'mutationFn'>
		) =>
			useMutation(() => tribesLibrary.leaveTribe(), {
				...options,
				onSuccess: (...args) => {
					queryClient.clear();
					const fn = options?.onSuccess;
					if (fn) fn(...args);
				},
			}),
		TribeId: () => useQuery(['getTribeId', address,], () => tribesLibrary.getTribeId(address!),),
		Tribe: () => {
			const { data: tribeId } = useQuery(['getTribeId', address,], () => tribesLibrary.getTribeId(address!),

			);
			return useQuery(['getTribeData', tribeId], () => tribesLibrary.getTribe(tribeId),);
		},
		TribeMembers: (tribeId: number) => useQuery(['getTribeMembers',], () => tribesLibrary.getTribeMembers(tribeId),),
	};
}

export const Tribes = createContainer(TribesState);

export function useTribes() {
	return useContainer(Tribes);
}
