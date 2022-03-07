import { ethers, constants } from 'ethers';
import { createContainer, useContainer } from '@decentology/unstated-next';
import { useQuery, useMutation, UseMutationOptions } from 'react-query';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useEnvironment } from './environment';

type ContractState = ethers.Contract;

function ERC777State(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const { address, web3Provider, provider } = useEthereum();
	const {FactoryABI, factoryAddress, ContractABI, contractAddress } = useEnvironment();
	const [contract, setContract] = useState<ContractState>(
		new ethers.Contract(factoryAddress!, FactoryABI, provider) as ContractState
	);
	const [proxyContract, setProxyContract] = useState<ContractState>();

	const signer = useMemo(async () => {
		return web3Provider?.getSigner();
	}, [web3Provider]);

	useEffect(() => {
		const fetchContract = async () => {
			const proxyAddress = await contract.getProxy(tenantId);
			if(proxyAddress == constants.AddressZero) {
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
	};
}

export const ERC777 = createContainer(ERC777State);

export function useERC777() {
	return useContainer(ERC777);
}
