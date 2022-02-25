import { useContext } from 'react';
import { Context } from './Provider';
import TokenFactory from '../utils/TokenFactory.json';
import Token from '../utils/Token.json';
import { ethers } from 'ethers';
import { createContainer, useContainer } from 'unstated-next';
import { useQuery, useMutation, useQueryClient, UseMutationOptions } from 'react-query';
import { useState, useEffect, useCallback } from 'react';
import { useEthereum } from '@decentology/hyperverse-ethereum';


type ContractState = ethers.Contract;

const TOKEN_FACTORY_ADDRESS = '0x9355320b627Bf3dBb4315886ff85e845f04Db6a9';
const TENANT_ADDRESS = '0xD847C7408c48b6b6720CCa75eB30a93acbF5163D';

function ModuleState(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const queryClient = useQueryClient();
	const { address, web3Provider, provider } = useEthereum();
	
	const [contract, setContract] = useState<ContractState>(
		new ethers.Contract(TOKEN_FACTORY_ADDRESS, TokenFactory.abi, provider) as ContractState
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


	const createInstance = useCallback(async (account: string, name:string, symbol:string, decimal:number) => {
		try {
			const createTxn = await contract.createInstance(account, name, symbol, decimal);
			return createTxn.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
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


	const getTotalSupply = useCallback(async (account: string) => {
		try {
			const proxyAddress = await contract.getProxy(account)
			const proxyContract = new ethers.Contract(proxyAddress, Token.abi, provider)
			
			const totalSupply = await proxyContract.totalSupply();
			return totalSupply.toNumber();
		} catch (err) {
			errors(err);
			throw err;
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contract]);

	const getBalanceOf = useCallback(async (account: string) => {
		try {
			const proxyAddress = await contract.getProxy(account)
			const proxyContract = new ethers.Contract(proxyAddress, Token.abi, provider)
			
			const balance = await proxyContract.balanceOf(account);
			console.log(balance.toNumber());
			return balance.toNumber();
		} catch (err) {
			errors(err);
			throw err;
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contract]);

	const getBalance = useCallback(async (account: string) => {
		try {
			const proxyAddress = await contract.getProxy(account)
			const proxyContract = new ethers.Contract(proxyAddress, Token.abi, web3Provider)
			const signer = await web3Provider?.getSigner();
			const ctr = proxyContract.connect(signer) as ContractState;

			
			const balance = await ctr.balance();
			console.log(balance.toNumber());
			return balance.toNumber();
		} catch (err) {
			errors(err);
			throw err;
		}

	}, [contract, errors, provider]);


	const transfer = useCallback(async (account:string, to: string, value:number) => {
		try {
			const proxyAddress = await contract.getProxy(account)
			const proxyContract = new ethers.Contract(proxyAddress, Token.abi, web3Provider)
			
			const signer = await web3Provider?.getSigner();
			const ctr = proxyContract.connect(signer) as ContractState;
			const transfer = await ctr.transfer(to, value);
			return transfer.wait();

		} catch (err) {
			errors(err);
			throw err;
		}
	}, [contract, errors, web3Provider]);


	return {
		tenantId,
		contract,
		NewInstance: (
			options?: Omit<UseMutationOptions<unknown, unknown, {account: string, name:string, symbol:string, decimal:number}, unknown>, 'mutationFn'>
		) => useMutation(({account, name, symbol, decimal}) => createInstance(account, name, symbol, decimal), options),
		Proxy:() => 	useQuery(['getProxy', address, contract?.address], () => getProxy(address), {
			enabled: !!address && !!contract?.address,
		 }),
		 TotalSupply:() => 	useQuery(['getTotalSupply', address, contract?.address], () => getTotalSupply(address), {
			enabled: !!address && !!contract?.address,
		 }),
		 Balance:() => 	useQuery(['getBalance', address, contract?.address], () => getBalance(address), {
			enabled: !!address && !!contract?.address,
		 }),
		 Transfer: (
			options?: Omit<UseMutationOptions<unknown, unknown, {account: string, to:string, value:number}, unknown>, 'mutationFn'>
		) => useMutation(({account, to, value}) => transfer(account, to, value), options),
		 
	}
}

export const Module = createContainer(ModuleState);

export function useToken() {
	return useContainer(Module);
}
