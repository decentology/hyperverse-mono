import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery, useMutation, UseMutationOptions } from 'react-query';
import { ethers } from 'ethers';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { createContainer, useContainer } from '@decentology/unstated-next';
import { useEnvironment } from './environment';

type ContractState = ethers.Contract;

function ModuleState(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const { address, web3Provider, provider } = useEthereum();
	const { factoryAddress, FactoryABI, ContractABI } = useEnvironment();
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

	const errors = (err: any) => {
		if (!factoryContract?.signer) {
			throw new Error('Please connect your wallet!');
		}

		if (err.code === 4001) {
			throw new Error('You rejected the transaction!');
		}

		throw err;
	};

	useEffect(() => {
		if (web3Provider) {
			setup();
		}
	}, [web3Provider]);

	const checkInstance = useCallback(
		async (account: any) => {
			try {
				const instance = await factoryContract.instance(account);
				return instance;
			} catch (err) {
				return false;
			}
		},
		[factoryContract]
	);

	const createInstance = useCallback(async () => {
		try {
			const createTxn = await factoryContract.createInstance();
			return createTxn.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	}, [factoryContract]);

	return {
		tenantId,
		factoryContract,
		proxyContract,
		CheckInstance: () =>
			useQuery(
				['checkInstance', address, factoryContract?.address],
				() => checkInstance(address),
				{
					enabled: !!address && !!factoryContract?.address
				}
			),
		NewInstance: (
			options?: Omit<UseMutationOptions<unknown, unknown, void, unknown>, 'mutationFn'>
		) => useMutation(createInstance, options)
	};
}

export const Module = createContainer(ModuleState);

export function useModule() {
	return useContainer(Module);
}
