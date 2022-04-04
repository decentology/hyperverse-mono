import { ethers, constants, BigNumber } from 'ethers';
import { createContainer, useContainer } from '@decentology/unstated-next';
import { useQuery, useMutation, UseMutationOptions } from 'react-query';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useEnvironment } from './environment';

type ContractState = ethers.Contract;

function ERC777State(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const { address, web3Provider, provider } = useEthereum();
	const { FactoryABI, factoryAddress, ContractABI, contractAddress } = useEnvironment();
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

	const checkInstance = async (account: any) => {
		try {
			const instance = await factoryContract.instance(account);
			return instance;
		} catch (err) {
			return false;
		}
	};

	const createInstance = useCallback(
		async (account: string, name: string, symbol: string, decimal: number) => {
			try {
				const createTxn = await factoryContract.createInstance(
					account,
					name,
					symbol,
					decimal
				);
				return createTxn.wait();
			} catch (err) {
				errors(err);
				throw err;
			}
		},
		[factoryContract?.signer]
	);

	const getProxy = async (account: string | null) => {
		try {
			const proxyAccount = await factoryContract.getProxy(account);
			return proxyAccount;
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

	const getDecimals = async () => {
		try {
			const name = await proxyContract?.decimals();
			return name;
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const getGranularity = async () => {
		try {
			const name = await proxyContract?.granularity();
			return name;
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const getTotalSupply = async () => {
		try {
			const totalSupply = await proxyContract?.totalSupply();
			return BigNumber.from(totalSupply);
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const getBalance = async () => {
		try {
			const balance = await proxyContract?.balance(address);
			return BigNumber.from(balance);
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const getBalanceOf = async (account: string) => {
		try {
			const balance = await proxyContract?.balanceOf(account);
			return BigNumber.from(balance);
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const send = useCallback(
		async (to: string, value: number, data: string) => {
			try {
				const send = await proxyContract?.send(
					to,
					value,
					ethers.utils.formatBytes32String(data)
				);
				return send.wait();
			} catch (err) {
				if (err instanceof String) {
					if (err.includes('Not enough balance')) {
						throw new Error('Not enough balance');
					}
					errors(err);
				}
				throw err;
			}
		},
		[!!proxyContract?.signer, !!address]
	);

	const transfer = useCallback(
		async (to: string, value: number) => {
			try {
				const transfer = await proxyContract?.transfer(to, value, { gasLimit: 1000000 });
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
		},
		[!!proxyContract?.signer, !!address]
	);

	const transferFrom = useCallback(
		async (from: string, to: string, value: number) => {
			try {
				const transfer = await proxyContract?.transferFrom(from, to, value);
				return transfer.wait();
			} catch (err) {
				errors(err);
				throw err;
			}
		},
		[address]
	);

	const allowance = async (owner: string, spender: string) => {
		try {
			const allowance = await proxyContract?.allowance(owner, spender);
			return BigNumber.from(allowance);
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const approve = useCallback(
		async (spender: string, amount: number) => {
			try {
				const approve = await proxyContract?.approve(spender, amount);
				return approve.wait();
			} catch (err) {
				errors(err);
				throw err;
			}
		},
		[address]
	);

	const getDefaultOperators = async () => {
		try {
			const defaultOperator = await proxyContract?.defaultOperators();
			return defaultOperator;
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const isOperatorFor = async (operator: string, tokenHolder: string) => {
		try {
			const checkOperator = await proxyContract?.isOperatorFor(operator, tokenHolder);
			return checkOperator;
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const authorizeOperator = useCallback(
		async (operator: string) => {
			try {
				const approve = await proxyContract?.authorizeOperator(operator);
				return approve.wait();
			} catch (err) {
				errors(err);
				throw err;
			}
		},
		[address]
	);

	const revokeOperator = useCallback(
		async (operator: string) => {
			try {
				const approve = await proxyContract?.revokeOperator(operator);
				return approve.wait();
			} catch (err) {
				errors(err);
				throw err;
			}
		},
		[address]
	);

	const operatorSend = useCallback(
		async (
			sender: string,
			recipient: string,
			value: number,
			data: string,
			operatorData: string
		) => {
			try {
				const send = await proxyContract?.operatorSend(
					sender,
					recipient,
					value,
					ethers.utils.formatBytes32String(data),
					ethers.utils.formatBytes32String(operatorData)
				);
				return send.wait();
			} catch (err) {
				if (err instanceof String) {
					if (err.includes('Not enough balance')) {
						throw new Error('Not enough balance');
					}
					errors(err);
				}
				throw err;
			}
		},
		[!!proxyContract?.signer, !!address]
	);

	const operatorBurn = useCallback(
		async (account: string, value: number, data: string, operatorData: string) => {
			try {
				const burn = await proxyContract?.operatorBurn(
					account,
					value,
					ethers.utils.formatBytes32String(data),
					ethers.utils.formatBytes32String(operatorData)
				);
				return burn.wait();
			} catch (err) {
				throw err;
			}
		},
		[address]
	);

	const burn = async (amount: number, data: string) => {
		try {
			const burn = await proxyContract?.burn(amount, ethers.utils.formatBytes32String(data));
			return burn.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const mint = async (amount: number) => {
		try {
			const mint = await proxyContract?.mint(amount);
			return mint.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	return {
		tenantId,
		factoryContract,
		proxyContract,
		CheckInstance: (account: string) =>
			useQuery(
				['checkInstance', address, factoryContract?.address, { account }],
				() => checkInstance(account),
				{
					enabled: !!address && !!factoryContract?.address && !!account,
				}
			),
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
			useQuery(['getProxy', address, factoryContract?.address], () => getProxy(address), {
				enabled: !!address && !!factoryContract?.address,
			}),
		TokenName: () =>
			useQuery(['getTokenName'], () => getTokenName(), {
				enabled: !!proxyContract?.signer,
			}),

		TokenSymbol: () =>
			useQuery(['getTokenSymbol'], () => getTokenSymbol(), {
				enabled: !!proxyContract?.signer,
			}),
		Deimals: () =>
			useQuery(['getDecimals'], () => getDecimals(), {
				enabled: !!proxyContract?.signer,
			}),
		Ganularity: () =>
			useQuery(['getGranularity'], () => getGranularity(), {
				enabled: !!proxyContract?.signer,
			}),
		TotalSupply: () =>
			useQuery(['getTotalSupply'], () => getTotalSupply(), {
				enabled: !!proxyContract,
			}),
		Balance: () =>
			useQuery(['getBalance', address], () => getBalance(), {
				enabled: !!proxyContract?.signer && !!address,
			}),
		BalanceOf: (account: string) =>
			useQuery(['getBalanceOf', address, { account }], () => getBalanceOf(account), {
				enabled: !!proxyContract?.signer && !!address,
			}),
		Send: (
			options?: Omit<
				UseMutationOptions<
					unknown,
					unknown,
					{ to: string; value: number; data: string },
					unknown
				>,
				'mutationFn'
			>
		) => useMutation(({ to, value, data }) => send(to, value, data), options),
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
		Approve: (
			options?: Omit<
				UseMutationOptions<unknown, unknown, { spender: string; amount: number }, unknown>,
				'mutationFn'
			>
		) => useMutation(({ spender, amount }) => approve(spender, amount), options),
		DefaultOperators: () =>
			useQuery(['getDefaultOperators'], () => getDefaultOperators(), {
				enabled: !!proxyContract,
			}),
		CheckOperator: (operator: string, tokenHolder: string) =>
			useQuery(
				['isOperatorFor', address, { operator, tokenHolder }],
				() => isOperatorFor(operator, tokenHolder),
				{
					enabled: !!proxyContract?.signer && !!address,
				}
			),
		AuthorizeOperator: (
			options?: Omit<
				UseMutationOptions<unknown, unknown, { operator: string }, unknown>,
				'mutationFn'
			>
		) => useMutation(({ operator }) => authorizeOperator(operator), options),
		RevokeOperator: (
			options?: Omit<
				UseMutationOptions<unknown, unknown, { operator: string }, unknown>,
				'mutationFn'
			>
		) => useMutation(({ operator }) => revokeOperator(operator), options),

		OperatorSend: (
			options?: Omit<
				UseMutationOptions<
					unknown,
					unknown,
					{
						sender: string;
						recipient: string;
						value: number;
						data: string;
						operatorData: string;
					},
					unknown
				>,
				'mutationFn'
			>
		) =>
			useMutation(
				({ sender, recipient, value, data, operatorData }) =>
					operatorSend(sender, recipient, value, data, operatorData),
				options
			),

		OperatorBurn: (
			options?: Omit<
				UseMutationOptions<
					unknown,
					unknown,
					{
						account: string;
						value: number;
						data: string;
						operatorData: string;
					},
					unknown
				>,
				'mutationFn'
			>
		) =>
			useMutation(
				({ account, value, data, operatorData }) =>
					operatorBurn(account, value, data, operatorData),
				options
			),

		Burn: (
			options?: Omit<
				UseMutationOptions<unknown, unknown, { amount: number; data: string }, unknown>,
				'mutationFn'
			>
		) => useMutation(({ amount, data }) => burn(amount, data), options),
		Mint: (
			options?: Omit<
				UseMutationOptions<unknown, unknown, { amount: number }, unknown>,
				'mutationFn'
			>
		) => useMutation(({ amount }) => mint(amount), options),
	};
}

export const ERC777 = createContainer(ERC777State);

export function useERC777() {
	return useContainer(ERC777);
}
