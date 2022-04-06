import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient, UseMutationOptions } from 'react-query';
import { ethers, constants } from 'ethers';
import { useEvent } from 'react-use';
import { useStorage } from '@decentology/hyperverse-storage-skynet';
import { createContainer, useContainer } from '@decentology/unstated-next';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEnvironment } from './environment';

type ContractState = ethers.Contract;

type MetaData = {
	name: string;
	description: string;
	image: string;
};

function WhitelistState(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const queryClient = useQueryClient();
	const { address, web3Provider, provider } = useEvm();
	const { clientUrl } = useStorage();
	const { uploadFile } = useStorage();
	const { ContractABI, FactoryABI, factoryAddress } = useEnvironment();
	const [factoryContract, setFactoryContract] = useState<ContractState>(
		new ethers.Contract(factoryAddress!, FactoryABI, provider) as ContractState
	);

	const [proxyContract, setProxyContract] = useState<ContractState>();

	const signer = useMemo(async () => {
		return web3Provider?.getSigner();
	}, [web3Provider]);

	useEffect(() => {
		const fetchContract = async () => {
			const proxyAddress = await factoryContract.getProxy(tenantId);
			if (proxyAddress == constants.AddressZero) {
				return;
			}
			const proxyCtr = new ethers.Contract(proxyAddress, ContractABI, provider);
			const accountSigner = await signer;
			if (accountSigner) {
				setProxyContract(proxyCtr.connect(accountSigner));
			} else {
				setProxyContract(proxyCtr);
			}
		};
		fetchContract();
	}, [factoryContract, tenantId, provider, signer]);

	const setup = useCallback(async () => {
		const accountSigner = await signer;
		if (accountSigner) {
			const ctr = factoryContract.connect(accountSigner) as ContractState;
			setFactoryContract(ctr);
		}
		// We have a defualt contract that has no signer. Which will work for read-only operations.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [signer]);

	const formatTribeResultFromTribeId = useCallback(
		async (tribeId: number) => {
			const txn = await proxyContract?.getTribeData(tribeId);
			const link = txn.replace('sia:', '');
			const json = JSON.parse(
				// eslint-disable-next-line no-await-in-loop
				await (await fetch(`${clientUrl}/${link}`)).text()
			);

			json.id = tribeId;
			json.imageUrl = `${clientUrl}/${json.image.replace('sia:', '')}`;
			return json;
		},
		[proxyContract?.signer]
	);

	const factoryErrors = useCallback(
		(err: any) => {
			if (!factoryContract?.signer) {
				throw new Error('Please connect your wallet!');
			}

			if (err.code === 4001) {
				throw new Error('You rejected the transaction!');
			}

			throw err;
		},
		[factoryContract?.signer]
	);

	useEffect(() => {
		if (web3Provider) {
			setup();
		}
	}, [web3Provider]);

	const checkInstance = async (account: any) => {
		try {
			const instance = await factoryContract.instance(account);
			return instance;
		} catch (err) {
			factoryErrors(err);
			throw err;
		}
	};

	const createInstance = useCallback(
		async (account: string) => {
			try {
				const createTxn = await factoryContract.createInstance(account);
				return createTxn.wait();
			} catch (err) {
				factoryErrors(err);
				throw err;
			}
		},
		[factoryContract?.signer]
	);

	const getTotalTenants = async () => {
		try {
			const tenantCount = await factoryContract.tenantCounter();

			return tenantCount.toNumber();
		} catch (err) {
			factoryErrors(err);
			throw err;
		}
	};

	const addTribe = useCallback(
		async (metadata: Omit<MetaData, 'image'>, image: File) => {
			try {
				// TODO: Add progress indicator notices for steps
				// 1. Upload file notification
				// 2. Upload metadata information
				// 3. Success notification

				const { skylink: imageLink } = await uploadFile(image);
				const fullMetaData: MetaData = {
					...metadata,
					image: imageLink.replace('sia:', ''),
				};
				const metadataFile = new File([JSON.stringify(fullMetaData)], 'metadata.json');
				const { skylink: metadataFileLink } = await uploadFile(metadataFile);

				const addTxn = await proxyContract?.addNewTribe(
					metadataFileLink.replace('sia:', '')
				);
				return addTxn.wait();
			} catch (err) {
				throw err;
			}
		},
		[address, proxyContract?.signer]
	);

	const getTribeId = async (account: string) => {
		try {
			const id = await proxyContract?.getUserTribe(account);
			return id.toNumber();
		} catch (err) {
			if (err instanceof Error) {
				if (err.message.includes('This member is not in a Tribe!')) {
					return null;
				}
			}
		}
	};

	const getTribe = async (id: number) => {
		try {
			await proxyContract?.getTribeData(id);
			return formatTribeResultFromTribeId(id);
		} catch (err) {
			throw err;
		}
	};

	const leaveTribe = useCallback(async () => {
		try {
			const leaveTxn = await proxyContract?.leaveTribe();
			await leaveTxn.wait();
			return leaveTxn.hash;
		} catch (err) {
			throw err;
		}
	}, [address, proxyContract?.signer]);

	const getAllTribes = useCallback(async () => {
		try {
			const tribeCount = await proxyContract?.tribeCounter();
			const tribes = [];
			for (let tribeId = 1; tribeId <= tribeCount.toNumber(); ++tribeId) {
				const json = await formatTribeResultFromTribeId(tribeId);
				tribes.push(json);
			}

			return tribes;
		} catch (err) {
			throw err;
		}
	}, [address, proxyContract?.address]);

	const joinTribe = useCallback(
		async (id) => {
			try {
				const joinTxn = await proxyContract?.joinTribe(id);
				return joinTxn.wait();
			} catch (err) {
				throw err;
			}
		},
		[address, proxyContract?.signer]
	);

	const getTribeMembers = async (tribeId: number) => {
		try {
			const events = await proxyContract?.queryFilter(
				proxyContract?.filters.JoinedTribe(),
				0
			);
			const members = events
				?.map((e) => {
					if (e.args) {
						return {
							tribeId: e.args[0].toNumber(),
							account: e.args[1],
						};
					}
				})
				.filter((e) => e?.tribeId === tribeId);
			return members;
		} catch (err) {
			throw err;
		}
	};

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
				() => checkInstance(address),
				{
					enabled: !!address && !!factoryContract?.signer,
				}
			),
		NewInstance: (
			options?: Omit<
				UseMutationOptions<unknown, unknown, { account: string }, unknown>,
				'mutationFn'
			>
		) => useMutation(({ account }) => createInstance(account), options),
		TotalTenants: () =>
			useQuery(['totalTenants', factoryContract?.address], () => getTotalTenants(), {
				enabled: !!factoryContract?.address,
			}),
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
		) => useMutation((payload) => addTribe(payload.metadata, payload.image), options),
		Tribes: () =>
			useQuery(['tribes', proxyContract?.address], () => getAllTribes(), {
				enabled: !!proxyContract?.address,
			}),
		Join: (
			options?: Omit<UseMutationOptions<unknown, unknown, unknown, unknown>, 'mutationFn'>
		) => useMutation((id) => joinTribe(id), options),
		Leave: (
			options?: Omit<UseMutationOptions<unknown, unknown, void, unknown>, 'mutationFn'>
		) =>
			useMutation(() => leaveTribe(), {
				...options,
				onSuccess: (...args) => {
					queryClient.clear();
					const fn = options?.onSuccess;
					if (fn) fn(...args);
				},
			}),
		TribeId: () =>
			useQuery(['getTribeId', address, proxyContract?.address], () => getTribeId(address!), {
				enabled: !!address && !!proxyContract?.address,
				retry: false,
			}),
		Tribe: () => {
			const { data: tribeId } = useQuery(
				['getTribeId', address, proxyContract?.address],
				() => getTribeId(address!),
				{ enabled: !!address && !!proxyContract?.address }
			);
			return useQuery(['getTribeData', tribeId], () => getTribe(tribeId), {
				enabled: !!tribeId,
			});
		},
		TribeMembers: (tribeId: number) =>
			useQuery(['getTribeMembers', proxyContract?.address], () => getTribeMembers(tribeId), {
				enabled: !!proxyContract?.address && !!tribeId,
			}),
	};
}

export const Whitelist = createContainer(WhitelistState);

export function useWhitelist() {
	return useContainer(Whitelist);
}
