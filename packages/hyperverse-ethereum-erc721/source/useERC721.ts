import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient, UseMutationOptions } from 'react-query';
import { ethers } from 'ethers';
import { ABI, FactoryABI, ExampleNFTFactory, TENANT_ADDRESS } from './constants';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { createContainer, useContainer } from 'unstated-next';

type ContractState = ethers.Contract;

function ERC721State(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const { address, web3Provider, provider, connect } = useEthereum();
	const [contract, setContract] = useState<ContractState>(
		new ethers.Contract(ExampleNFTFactory, FactoryABI, provider) as ContractState
	);

	const setup = useCallback(async () => {
		const signer = await web3Provider?.getSigner();
		if (signer && contract) {
			const ctr = contract.connect(signer) as ContractState;
			setContract(ctr);
		}
	}, [contract, web3Provider]);

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
	}, [setup, web3Provider]);

	const createInstance = useCallback(async (name: string, symbol: string) => {
		try {
			const createTxn = await contract.createInstance(name, symbol);
			return createTxn.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	}, [contract]);

	const getProxy = useCallback(async (account: string) => {
		try {
			const proxyAccount = await contract.getProxy(account);
			return proxyAccount;
		} catch (err) {
			errors(err);
			throw err;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contract]);

	const mintNFT = useCallback(async () => {
		try {
			const mintNFT = await contract.getProxy(tenantId).createNFT();
			return mintNFT.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	}, [contract]);

	const getBalance = useCallback(async (address) => {
		try {
			const proxyAddress = await contract.getProxy(TENANT_ADDRESS)
			const proxyContract = new ethers.Contract(proxyAddress, ABI, provider)

			const balance = await proxyContract.balanceOf(address);
			return balance.toNumber();
		} catch (err) {
			throw err;
		}
	}, [contract, provider]);

	return {
		tenantId,
		contract,
		NewInstance: (
			options?: Omit<UseMutationOptions<unknown, unknown, unknown, unknown>, 'mutationFn'>
		) => useMutation(({ name, symbol }) => createInstance(name, symbol), options),
		MintNFT: (
			options?: Omit<UseMutationOptions<unknown, unknown, void, unknown>, 'mutationFn'>
		) => useMutation(() => mintNFT(), options),
		GetBalance: () =>
			useQuery(['getBalance', address, contract?.address], (address) => getBalance(address), {
				enabled: !!contract?.address,
				retry: false,
			}),
	};
}

export const ERC721 = createContainer(ERC721State);

export function useERC721() {
	return useContainer(ERC721);
}
