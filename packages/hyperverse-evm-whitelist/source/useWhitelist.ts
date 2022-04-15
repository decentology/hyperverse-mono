import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient, UseMutationOptions } from 'react-query';
import { ethers, constants } from 'ethers';
import { useEvent } from 'react-use';
import { createContainer, useContainer } from '@decentology/unstated-next';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEnvironment } from './environment';

type ContractState = ethers.Contract;



function WhitelistState(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const queryClient = useQueryClient();
	const { address, web3Provider, provider } = useEvm();
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


	const useWhitelistEvents = (eventName: string, callback: any) => {
		return useEvent(eventName, useCallback(callback, [proxyContract]), proxyContract);
	};

	return {
		tenantId,
		factoryContract,
		proxyContract,
		useWhitelistEvents,
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
	
	};
}

export const Whitelist = createContainer(WhitelistState);

export function useWhitelist() {
	return useContainer(Whitelist);
}
