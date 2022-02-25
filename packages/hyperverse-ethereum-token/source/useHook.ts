import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient, UseMutationOptions } from 'react-query';
import { ethers } from 'ethers';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { TokenABI, TokenFactoryABI, TOKEN_MAIN_ADDRESS, TOKEN_FACTORY_ADDRESS } from './constants';
import { createContainer, useContainer } from 'unstated-next';

type ContractState = ethers.Contract;

function ModuleState(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const queryClient = useQueryClient();
	const { address, web3Provider, provider } = useEthereum();
	const [tokenContract, setTokenContract] = useState<ContractState>(	new ethers.Contract(CONTRACT_ADDRESS, ContractABI, provider) as ContractState);
	// const [contract, setTribesContract] = useState<ContractState>(
	// 	new ethers.Contract(CONTRACT_ADDRESS, ContractABI, provider) as ContractState
	// );
	const setup = useCallback(async () => {
		const signer = await web3Provider?.getSigner();
		if (signer && contract) {
			const ctr = contract.connect(signer) as ContractState;
			setTribesContract(ctr);
		}
	}, [web3Provider]);


	const errors = (err: any) => {
		if (!contract?.signer) {
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
				const instance = await contract.instance(account);
				return instance;
			} catch (err) {
				return false;
			}
		},
		[contract]
	);

	const createInstance = useCallback(async () => {
		try {
			const createTxn = await contract.createInstance();
			return createTxn.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	}, [contract]);

	return {
		tenantId,
		contract,
		CheckInstance: () =>
			useQuery(['checkInstance', address, contract?.address], () => checkInstance(address), {
				enabled: !!address && !!contract?.address,
			}),
		NewInstance: (
			options?: Omit<UseMutationOptions<unknown, unknown, void, unknown>, 'mutationFn'>
		) => useMutation(createInstance, options),
	}
}

export const Module = createContainer(ModuleState);

export function useModule() {
	return useContainer(Module);
}
