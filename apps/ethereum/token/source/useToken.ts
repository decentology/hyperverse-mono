import { useContext, useMemo } from 'react';
import { Context } from './Provider';
import TokenFactory from '../utils/TokenFactory.json';
import Token from '../utils/Token.json';
import { ethers } from 'ethers';
import { createContainer,  useContainer } from 'unstated-next';
import {
	 useQuery,
	 useMutation,
	 useQueryClient,
	 UseMutationOptions
} from 'react-query';
import {  useState,  useEffect,  useCallback } from 'react';
import {  useEthereum } from '@decentology/hyperverse-ethereum';

type ContractState = ethers.Contract;

const TOKEN_FACTORY_ADDRESS = '0x9355320b627Bf3dBb4315886ff85e845f04Db6a9';
const TENANT_ADDRESS = '0xD847C7408c48b6b6720CCa75eB30a93acbF5163D';

function ModuleState(initialState: { tenantId: string } = { tenantId: TENANT_ADDRESS }) {
	const { tenantId } = initialState;
	const queryClient = useQueryClient();
	const { address, web3Provider, provider } = useEthereum();

	const [contract, setContract] = useState<ContractState>(
		new ethers.Contract(TOKEN_FACTORY_ADDRESS, TokenFactory.abi, provider) as ContractState
	);
	const [proxyContract, setProxyContract] = useState<ContractState>();

	const signer = useMemo(async () => {
		return web3Provider?.getSigner();
	}, [web3Provider]);

	useEffect(() => {
		const fetchContract = async () => {
			const proxyAddress = await contract.getProxy(tenantId);
			const proxyCtr = new ethers.Contract(proxyAddress, Token.abi, provider);
			if(signer) {
				setProxyContract(proxyCtr.connect(await signer));
			}else{

				setProxyContract(proxyCtr);
			}
		};
		fetchContract();
	}, [contract, tenantId, provider, signer]);

	const setup = useCallback(async () => {
		if (await signer) {
			const ctr = contract.connect(await signer) as ContractState;
			setContract(ctr);
		}
		// We have a defualt contract that has no signer. Which will work for read-only operations.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [signer]);

	const errors = useCallback(
		(err: any) => {
			if (!contract?.signer) {
				throw new Error('Please connect your wallet!');
			}

			if (err.code === 4001) {
				throw new Error('You rejected the transaction!');
			}

			throw err;
		},
		[contract?.signer]
	);

	useEffect(() => {
		if (web3Provider) {
			setup();
		}
	}, [setup, web3Provider]);

	const createInstance = async (account: string, name: string, symbol: string, decimal: number) => {
			try {
				const createTxn = await contract.createInstance(account, name, symbol, decimal);
				return createTxn.wait();
			} catch (err) {
				errors(err);
				throw err;
			}
		}

	const getProxy = async (account: string) => {
			try {
				const proxyAccount = await contract.getProxy(account);
				return proxyAccount;
			} catch (err) {
				errors(err);
				throw err;
			}
		}

	const getTotalSupply = async () => {
		try {
			const totalSupply = await proxyContract.totalSupply();
			return totalSupply.toNumber();
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const getBalanceOf = async (account: string) => {
			try {
				const balance = await proxyContract.balanceOf(account);
				return balance.toNumber();
			} catch (err) {
				errors(err);
				throw err;
			}
		}

	const getBalance = async () => {
		try {
			const balance = await proxyContract.balance();
			return balance.toNumber();
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const transfer = async (to: string, value: number) => {
			try {
				const transfer = await proxyContract.transfer(to, value);
				return transfer.wait();
			} catch (err) {
				errors(err);
				throw err;
			}
	}

	return {
		tenantId,
		contract,
		NewInstance: (
			options?: Omit<
				UseMutationOptions<
					unknown,
					unknown,
					{ account: string; name: string; symbol: string; decimal: number },
					unknown
				>,
				'mutationFn'
			>
		) =>
			useMutation(
				({ account, name, symbol, decimal }) =>
					createInstance(account, name, symbol, decimal),
				options
			),
		Proxy: () =>
			useQuery(['getProxy', address, contract?.address], () => getProxy(address), {
				enabled: !!address && !!contract?.address
			}),
		TotalSupply: () =>
			useQuery(['getTotalSupply', address], () => getTotalSupply(), {
				enabled: !!proxyContract?.signer && !!address
			}),
		Balance: () =>
			useQuery(['getBalance', address], () => getBalance(), {
				enabled: !!proxyContract?.signer && !!address
			}),
			BalanceOf: (account: string) =>
			useQuery(['getBalanceOf', address,  {account}], () => getBalanceOf(account), {
				enabled: !!proxyContract?.signer && !!address
			}),
		Transfer: (
			options?: Omit<
				UseMutationOptions<
					unknown,
					unknown,
					{ to: string; value: number },
					unknown
				>,
				'mutationFn'
			>
		) => useMutation(({ to, value }) => transfer(to, value), options)
	};
}

export const Module = createContainer(ModuleState);

export function useToken() {
	return useContainer(Module);
}
