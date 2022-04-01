import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient, UseMutationOptions } from 'react-query';
import { ethers, constants } from 'ethers';
import { useEvent } from 'react-use';
import { useStorage } from '@decentology/hyperverse-storage-skynet';
import { createContainer, useContainer } from '@decentology/unstated-next';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEnvironment } from './environment';
import { MetaData } from './types';
import { TribesLibrary } from './lib/TribesLibrary';
import { useHyperverse } from '@decentology/hyperverse';

type ContractState = ethers.Contract;

function TribesState(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const queryClient = useQueryClient();
	const { address, connectedProvider, readOnlyProvider } = useEvm();
	const { blockchain, network } = useHyperverse();
	const { clientUrl, uploadFile } = useStorage();
	const { ContractABI, FactoryABI, factoryAddress } = useEnvironment();
	const [factoryContract, setFactoryContract] = useState<ContractState>(
		new ethers.Contract(factoryAddress!, FactoryABI, readOnlyProvider) as ContractState
	);
	const [proxyContract, setProxyContract] = useState<ContractState>();
	const [tribesLibrary, setTribesLibrary] = useState<TribesLibrary>(
		new TribesLibrary({
			provider: readOnlyProvider,
			blockchainName: blockchain?.name!,
			network: network,
			tenantId: tenantId,
			storage: {
				clientUrl,
				uploadFile,
			},
		})
	);

	const signer = useMemo(async () => {
		return connectedProvider?.getSigner();
	}, [connectedProvider]);

	useEffect(() => {
		const fetchContract = async () => {
			let proxyAddress;
			try {
				proxyAddress = await factoryContract.getProxy(tenantId);
			} catch (error) {
				throw new Error(`Failed to get proxy address for tenant ${tenantId}`);
			}
			if (proxyAddress == constants.AddressZero) {
				return;
			}
			const proxyCtr = new ethers.Contract(proxyAddress, ContractABI, readOnlyProvider);
			const accountSigner = await signer;
			if (accountSigner) {
				setProxyContract(proxyCtr.connect(accountSigner));
			} else {
				setProxyContract(proxyCtr);
			}
		};
		try {
			fetchContract();
		} catch (error) {
			console.error('Failing to get proxy', error);
		}
	}, [factoryContract, tenantId, readOnlyProvider, signer]);

	const setup = useCallback(async () => {
		const accountSigner = await signer;
		if (accountSigner) {
			const ctr = factoryContract.connect(accountSigner) as ContractState;
			setFactoryContract(ctr);
		}
		// We have a defualt contract that has no signer. Which will work for read-only operations.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [signer]);

	useEffect(() => {
		if (connectedProvider) {
			setup();
		}
	}, [connectedProvider]);

	const useTribeEvents = (eventName: string, callback: any) => {
		return useEvent(eventName, useCallback(callback, [proxyContract]), proxyContract);
	};

	return {
		tenantId,
		factoryContract,
		proxyContract,
		useTribeEvents,
		CheckInstance: () =>
			useQuery(
				['checkInstance', address, factoryContract?.address],
				() => tribesLibrary.checkInstance(address),
				{
					enabled: !!address && !!factoryContract?.signer,
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
				['totalTenants', factoryContract?.address],
				() => tribesLibrary.getTotalTenants(),
				{
					enabled: !!factoryContract?.address,
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
			useQuery(['tribes', proxyContract?.address], () => tribesLibrary.getAllTribes(), {
				enabled: !!proxyContract?.address,
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
				['getTribeId', address, proxyContract?.address],
				() => tribesLibrary.getTribeId(address!),
				{
					enabled: !!address && !!proxyContract?.address,
					retry: false,
				}
			),
		Tribe: () => {
			const { data: tribeId } = useQuery(
				['getTribeId', address, proxyContract?.address],
				() => tribesLibrary.getTribeId(address!),
				{ enabled: !!address && !!proxyContract?.address }
			);
			return useQuery(['getTribeData', tribeId], () => tribesLibrary.getTribe(tribeId), {
				enabled: !!tribeId,
			});
		},
		TribeMembers: (tribeId: number) =>
			useQuery(
				['getTribeMembers', proxyContract?.address],
				() => tribesLibrary.getTribeMembers(tribeId),
				{
					enabled: !!proxyContract?.address && !!tribeId,
				}
			),
	};
}

export const Tribes = createContainer(TribesState);

export function useTribes() {
	return useContainer(Tribes);
}
