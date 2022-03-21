import { ethers, constants, BigNumber } from 'ethers';
import { createContainer, useContainer } from '@decentology/unstated-next';
import { useQuery, useMutation, UseMutationOptions } from 'react-query';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useEnvironment } from './environment';

type ContractState = ethers.Contract;

function StakeRewardsState(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const { address, web3Provider, provider } = useEthereum();
	const {FactoryABI, factoryAddress, ContractABI, contractAddress } = useEnvironment();
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

	const createInstance = useCallback (async (
		account: string,
		stakingToken: string,
		rewardsToken: string,
		rewardRate: number
	) => {
		try {
			const createTxn = await factoryContract.createInstance(
				account,
				stakingToken,
				rewardsToken,
				rewardRate
			);
			return createTxn.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	}, [factoryContract?.signer]);

	const getProxy = async (account: string | null) => {
		try {
			const proxyAccount = await factoryContract.getProxy(account);
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

	const rewardPerToken = async () => {
		try {
			const reward = await proxyContract?.rewardPerToken();
			return reward.toNumber();
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const getEarned = async (account: string) => {
		try {
			const earned = await proxyContract?.earned(account);
			return earned.toNumber();
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const stake = useCallback(async (amount: number) => {
		try {
			const stake = await proxyContract?.stake(amount);
			return stake.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	}, [proxyContract?.signer]);


	const withdraw = useCallback(async (amount: number) => {
		try {
			const withdraw = await proxyContract?.withdraw(amount);
			return withdraw.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	}, [proxyContract?.signer]);

	const getReward = useCallback(async () => {
		try {
			const getReward = await proxyContract?.getReward();
			return getReward.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	}, [proxyContract?.signer]);


	const getStakeToken = async () => {
		try {
			const stakeToken = await proxyContract?.stakingToken();
			return stakeToken;
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const getRewardToken = async () => {
		try {
			const rewardToken = await proxyContract?.rewardsToken();
			return rewardToken;
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	return {
		tenantId,
		factoryContract,
		proxyContract,
		CheckInstance: () =>
		useQuery(['checkInstance', address, factoryContract?.address], () => checkInstance(address), {
			enabled: !!address && !!factoryContract?.address,
		}),
		NewInstance: (
			options?: Omit<
				UseMutationOptions<
					unknown,
					unknown,
					{ account: string; stakingToken: string; rewardsToken: string; rewardRate: number },
					unknown
				>,
				'mutationFn'
			>
		) =>
			useMutation(
				({ account, stakingToken, rewardsToken, rewardRate }) =>
					createInstance(account, stakingToken, rewardsToken, rewardRate),
				options
			),
		Proxy: () =>
			useQuery(['getProxy', address, factoryContract?.address], () => getProxy(address), {
				enabled: !!address && !!factoryContract?.address,
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

		RewardPerToken: () =>
			useQuery(['rewardPerToken', address], () => rewardPerToken(), {
				enabled: !!proxyContract?.signer && !!address,
			}),

		Earned: (account: string) =>
			useQuery(['getBalanceOf', address, { account }], () => getEarned(account), {
				enabled: !!proxyContract?.signer && !!address,
			}),

		StakeTokens: (
			options?: Omit<
				UseMutationOptions<unknown, unknown, { amount: number }, unknown>,
				'mutationFn'
			>
		) => useMutation(({ amount }) => stake(amount), options),

		WithdrawTokens: (
			options?: Omit<
				UseMutationOptions<unknown, unknown, { amount: number }, unknown>,
				'mutationFn'
			>
		) => useMutation(({ amount }) => withdraw(amount), options),

		WithdrawReward: (
			options?: Omit<UseMutationOptions<unknown, unknown, unknown, unknown>, 'mutationFn'>
		) => useMutation(() => getReward(), options),

		StakeTokenContract: () =>
			useQuery(['getStakeToken', address], () => getStakeToken(), {
				enabled: !!proxyContract?.signer && !!address,
			}),

		RewardTokenContract: () =>
			useQuery(['getRewardToken', address], () => getRewardToken(), {
				enabled: !!proxyContract?.signer && !!address ,
			}),
	};
}

export const StakeRewards = createContainer(StakeRewardsState);

export function useStakeRewards() {
	return useContainer(StakeRewards);
}
