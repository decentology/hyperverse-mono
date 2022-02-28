import { TokenABI, TokenFactoryABI, TOKEN_FACTORY_ADDRESS } from './constants';
import { ethers } from 'ethers';
import { createContainer, useContainer } from '@decentology/unstated-next';
import { useQuery, useMutation, UseMutationOptions } from 'react-query';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { TENANT_ADDRESS } from './constants';

type ContractState = ethers.Contract;

function TokenState(initialState: { tenantId: string } = { tenantId: TENANT_ADDRESS }) {
	const { tenantId } = initialState;
	const { address, web3Provider, provider } = useEthereum();

	const [contract, setContract] = useState<ContractState>(
		new ethers.Contract(TOKEN_FACTORY_ADDRESS, TokenFactoryABI, provider) as ContractState
	);
	const [proxyContract, setProxyContract] = useState<ContractState>();

	const signer = useMemo(async () => {
		return web3Provider?.getSigner();
	}, [web3Provider]);

	useEffect(() => {
		const fetchContract = async () => {
			const proxyAddress = await contract.getProxy(tenantId);
			if(proxyAddress == '0x0000000000000000000000000000000000000000') {
				return;
			}
			const proxyCtr = new ethers.Contract(proxyAddress, TokenABI, provider);
			const accountSigner = await signer;
			if (accountSigner) {
				setProxyContract(proxyCtr.connect(accountSigner));
			} else {
				setProxyContract(proxyCtr);
			}
		};
		fetchContract();
	}, [contract, tenantId, provider, signer]);

	const setup = useCallback(async () => {
		const accountSigner = await signer;
		if (accountSigner) {
			const ctr = contract.connect(accountSigner) as ContractState;
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

	const createInstance = async (
		account: string,
		name: string,
		symbol: string,
		decimal: number
	) => {
		try {
			const createTxn = await contract.createInstance(account, name, symbol, decimal);
			return createTxn.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const getProxy = async (account: string | null) => {
		try {
			const proxyAccount = await contract.getProxy(account);
			return proxyAccount;
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const getTotalSupply = async () => {
		try {
			const totalSupply = await proxyContract?.totalSupply();
			return totalSupply.toNumber();
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const getBalanceOf = async (account: string) => {
		try {
			const balance = await proxyContract?.balanceOf(account);
			return balance.toNumber();
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const getBalance = async () => {
		try {
			const balance = await proxyContract?.balance();
			return balance.toNumber();
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const transfer = async (to: string, value: number) => {
		try {
			const transfer = await proxyContract?.transfer(to, value);
			return transfer.wait();
		} catch (err) {
			if (err instanceof String) {
				if (err.includes('Not enough balance')) {
					throw new Error('Not enough balance');
				}
				errors(err);
			}
			throw err;
		}
	};

	const transferFrom = useCallback(async (from: string, to: string, value: number) => {
		try {
			const transfer = await proxyContract?.transferFrom(from, to, value);
			return transfer.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	} , [address]);

	const allowance = async (owner: string, spender: string) => {
		try {
			const allowance = await proxyContract?.allowance(owner, spender);
			return allowance.toNumber();
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const approve = useCallback (async (spender: string, amount: number) => {
		try {
			const approve = await proxyContract?.approve(spender, amount);
			return approve.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	}, [address]);

	const mint = async (amount: number) => {
		try {
			const mint = await proxyContract?.mint(amount);
			return mint.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const burn = async (amount: number) => {
		try {
			const burn = await proxyContract?.burn(amount);
			return burn.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const getTokenName = async () => {
		try {
			const name = await proxyContract?.name();
			return name;
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const getTokenSymbol = async () => {
		try {
			const name = await proxyContract?.symbol();
			return name;
		} catch (err) {
			errors(err);
			throw err;
		}
	};
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
				enabled: !!address && !!contract?.address,
			}),
		TotalSupply: () =>
			useQuery(['getTotalSupply', address], () => getTotalSupply(), {
				enabled: !!proxyContract?.signer && !!address,
			}),
		Balance: () =>
			useQuery(['getBalance', address], () => getBalance(), {
				enabled: !!proxyContract?.signer && !!address,
			}),
		BalanceOf: (account: string) =>
			useQuery(['getBalanceOf', address, { account }], () => getBalanceOf(account), {
				enabled: !!proxyContract?.signer && !!address,
			}),
		Transfer: (
			options?: Omit<
				UseMutationOptions<unknown, unknown, { to: string; value: number }, unknown>,
				'mutationFn'
			>
		) => useMutation(({ to, value }) => transfer(to, value), options),
		TransferFrom: (
			options?: Omit<
				UseMutationOptions<
					unknown,
					unknown,
					{ from: string; to: string; value: number },
					unknown
				>,
				'mutationFn'
			>
		) => useMutation(({ from, to, value }) => transferFrom(from, to, value), options),
		Allowance: (owner: string, spender: string) =>
			useQuery(['allowance', address, { owner, spender }], () => allowance(owner, spender), {
				enabled: !!proxyContract?.signer && !!address,
			}),

		Mint: (
			options?: Omit<
				UseMutationOptions<unknown, unknown, { amount: number }, unknown>,
				'mutationFn'
			>
		) => useMutation(({ amount }) => mint(amount), options),

		Burn: (
			options?: Omit<
				UseMutationOptions<unknown, unknown, { amount: number }, unknown>,
				'mutationFn'
			>
		) => useMutation(({ amount }) => burn(amount), options),

		TokenName: () =>
			useQuery(['getTokenName', address], () => getTokenName(), {
				enabled: !!proxyContract?.signer && !!address,
			}),

		TokenSymbol: () =>
			useQuery(['getTokenSymbol', address], () => getTokenSymbol(), {
				enabled: !!proxyContract?.signer && !!address,
			}),

		Approve: (
			options?: Omit<
				UseMutationOptions<unknown, unknown, { spender: string; amount: number }, unknown>,
				'mutationFn'
			>
		) => useMutation(({ spender, amount }) => approve(spender, amount), options),
	};
}

export const Token = createContainer(TokenState);

export function useToken() {
	return useContainer(Token);
}
