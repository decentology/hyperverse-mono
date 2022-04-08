import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient, UseMutationOptions } from 'react-query';
import { ethers } from 'ethers';
import { useEvent } from 'react-use';
import { useStorage } from '@decentology/hyperverse-storage-skynet';
import { createContainer, useContainer } from '@decentology/unstated-next';
import { useEvm } from '@decentology/hyperverse-evm';
import { MetaData } from './types';
import { TribesLibrary } from './lib/TribesLibrary';
import { useHyperverse } from '@decentology/hyperverse';
import { Web3Provider } from '@ethersproject/providers';

function TribesState(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const queryClient = useQueryClient();
	const { address, connectedProvider, readOnlyProvider } = useEvm();
	const { blockchain, network } = useHyperverse();
	const hyperverse = useHyperverse();
	const storage = useStorage();
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
		CheckInstance: () =>
			useQuery(
				['checkInstance', address, tribesLibrary.factoryContract?.address],
				() => tribesLibrary.checkInstance(address),
				{
					enabled: !!address && !!tribesLibrary.factoryContract?.signer,
				}
			),
		NewInstance: (
			options?: Omit<
				UseMutationOptions<unknown, unknown, { account: string }, unknown>,
				'mutationFn'
			>
		) => useMutation(({ account }) => tribesLibrary.createInstance(account), options),
		TotalTenants: () =>
			useQuery(
				['totalTenants', tribesLibrary.factoryContract?.address],
				() => tribesLibrary.getTotalTenants(),
				{
					enabled: !!tribesLibrary.factoryContract?.address,
				}
			),
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
		Tribes: () =>
			useQuery(['tribes', tribesLibrary.proxyContract?.address], () => tribesLibrary.getAllTribes(), {
				enabled: !!tribesLibrary.proxyContract?.address,
			}),
		Join: (
			options?: Omit<UseMutationOptions<unknown, unknown, unknown, unknown>, 'mutationFn'>
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
		TribeId: () =>
			useQuery(
				['getTribeId', address, tribesLibrary.proxyContract?.address],
				() => tribesLibrary.getTribeId(address!),
				{
					enabled: !!address && !!tribesLibrary.proxyContract?.address,
					retry: false,
				}
			),
		Tribe: () => {
			const { data: tribeId } = useQuery(
				['getTribeId', address, tribesLibrary.proxyContract?.address],
				() => tribesLibrary.getTribeId(address!),
				{ enabled: !!address && !!tribesLibrary.proxyContract?.address }
			);
			return useQuery(['getTribeData', tribeId], () => tribesLibrary.getTribe(tribeId), {
				enabled: !!tribeId,
			});
		},
		TribeMembers: (tribeId: number) =>
			useQuery(
				['getTribeMembers', tribesLibrary.proxyContract?.address],
				() => tribesLibrary.getTribeMembers(tribeId),
				{
					enabled: !!tribesLibrary.proxyContract?.address && !!tribeId,
				}
			),
	};
}

export const Tribes = createContainer(TribesState);

export function useTribes() {
	return useContainer(Tribes);
}
