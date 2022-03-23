import { ethers, constants } from 'ethers';
import { createContainer, useContainer } from '@decentology/unstated-next';
import {
	useQuery,
	useMutation,
	UseMutationOptions
} from 'react-query';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEnvironment } from './environment';

type ContractState = ethers.Contract;

function ERC721State(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const { address, web3Provider, provider } = useEvm();
	const { factoryAddress, ContractABI, FactoryABI } = useEnvironment()
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

	const errors = useCallback(
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
	}, [setup, web3Provider]);

	const createInstance = async (name: string, symbol: string) => {
		try {
			console.log("name" + name + "symbol" + symbol)
			const createTxn = await factoryContract.createInstance(name, symbol);
			return createTxn.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	}

	const getProxy = async (account: string | null) => {
		try {
			console.log("getProxy:", account);
			const proxyAccount = await factoryContract.getProxy(account);
			return proxyAccount;
		} catch (err) {
			errors(err);
			throw err;
		}
	}

	const getTotalSupply = async () => {
		try {
			const totalSupply = await proxyContract?.tokenCounter();
			console.log("total supply:", totalSupply.toNumber())
			return totalSupply.toNumber();
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const getBalance = async () => {
		try {
			console.log("getBalance:", address);
			const balance = await proxyContract?.balanceOf(address);
			return balance.toNumber();
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const getBalanceOf = async (account: string) => {
		try {
			console.log("balanceOf:", account);
			const balance = await proxyContract?.balanceOf(account);
			return balance.toNumber();
		} catch (err) {
			errors(err);
			throw err;
		}
	}

	const getOwnerOf = async (tokenId: number) => {
		try {
			console.log("ownerOf:", tokenId);
			const owner = await proxyContract?.ownerOf(tokenId);
			return owner;
		} catch (err) {
			return "0x000";
		}
	}

	const mintNFT = async (to: string) => {
		try {
			const mint = await proxyContract?.createNFT(to);
			return mint.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	}

	const transfer = async (from: string, to: string, tokenId: number) => {
		try {
			const transfer = await proxyContract?.transferFrom(from, to, tokenId);
			return transfer.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	}

	return {
		tenantId,
		contract: factoryContract,
		NewInstance: (
			options?: Omit<
				UseMutationOptions<
					unknown,
					unknown,
					{ name: string; symbol: string; },
					unknown
				>,
				'mutationFn'
			>
		) =>
			useMutation(
				({ name, symbol }) =>
					createInstance(name, symbol),
				options
			),
		Proxy: () =>
			useQuery(['getProxy', address, factoryContract?.address], () => getProxy(address), {
				enabled: !!address && !!factoryContract?.address
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
			useQuery(['getBalanceOf', address, { account }], () => getBalanceOf(account), {
				enabled: !!proxyContract?.signer && !!address
			}),
		OwnerOf: (tokenId: number) =>
			useQuery(['getBalanceOf', address, { tokenId }], () => getOwnerOf(tokenId), {
				enabled: !!proxyContract?.signer && !!address
			}),
		MintNFT: (
			options?: Omit<
				UseMutationOptions<
					unknown,
					unknown,
					{ to: string },
					unknown
				>,
				'mutationFn'
			>
		) => useMutation(({ to }) => mintNFT(to), options),
		Transfer: (
			options?: Omit<
				UseMutationOptions<
					unknown,
					unknown,
					{ from: string, to: string; tokenId: number },
					unknown
				>,
				'mutationFn'
			>
		) => useMutation(({ from, to, tokenId }) => transfer(from, to, tokenId), options)
	};
}

export const ERC721 = createContainer(ERC721State);

export function useERC721() {
	return useContainer(ERC721);
}

