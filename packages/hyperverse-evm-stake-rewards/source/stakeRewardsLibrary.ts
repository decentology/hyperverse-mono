import { HyperverseConfig } from '@decentology/hyperverse';
import { EvmLibraryBase, getProvider } from '@decentology/hyperverse-evm';
import { ethers, BigNumber } from 'ethers';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { CancellablePromise } from 'real-cancellable-promise';
import { getEnvironment } from './environment';

export type StakeRewardsLibraryType = Awaited<ReturnType<typeof StakeRewardsLibraryInternal>>;

export function StakeRewardsLibrary(
	...args: Parameters<typeof StakeRewardsLibraryInternal>
): CancellablePromise<StakeRewardsLibraryType> {
	return new CancellablePromise(StakeRewardsLibraryInternal(...args), () => {});
}

export async function StakeRewardsLibraryInternal(
	hyperverse: HyperverseConfig,
	providerOrSigner?: ethers.providers.Provider | ethers.Signer
) {
	const { FactoryABI, factoryAddress, ContractABI } = getEnvironment(
		hyperverse.blockchain?.name!,
		hyperverse.network
	);

	if (!providerOrSigner) {
		providerOrSigner = getProvider(hyperverse.network);
	}

	const base = await EvmLibraryBase(
		'StakeRewards',
		hyperverse,
		factoryAddress!,
		FactoryABI,
		ContractABI,
		providerOrSigner
	);

	const getTotalSuply = async () => {
		try {
			const totalSupply = await base.proxyContract?.totalSupply();
			return BigNumber.from(totalSupply) as Number;
		} catch (error) {
			throw error;
		}
	};

	const getBalanceOf = async (account: string) => {
		try {
			const balance = await base.proxyContract?.balanceOf(account);
			return BigNumber.from(balance) as Number;
		} catch (error) {
			throw error;
		}
	};

	const getBalance = async () => {
		try {
			const balance = await base.proxyContract?.balance();
			return BigNumber.from(balance) as Number;
		} catch (error) {
			throw error;
		}
	};

	const rewardPerToken = async () => {
		try {
			const reward = await base.proxyContract?.rewardPerToken();
			return reward.toNumber() as Number;
		} catch (error) {
			throw error;
		}
	};

	const getEarned = async (account: string) => {
		try {
			const earned = await base.proxyContract?.earned(account);
			return BigNumber.from(earned) as Number;
		} catch (error) {
			throw error;
		}
	};

	const stake = async (amount: number) => {
		try {
			const stakeTxn = await base.proxyContract?.stake(amount);
			return stakeTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	const withdraw = async (amount: number) => {
		try {
			const withdrawTxn = await base.proxyContract?.withdraw(amount);
			return withdrawTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	const claimReward = async () => {
		try {
			const reward = await base.proxyContract?.claimReward();
			return BigNumber.from(reward) as Number;
		} catch (error) {
			throw error;
		}
	};

	const getStakeToken = async () => {
		try {
			const stakeToken = await base.proxyContract?.stakingToken();
			return stakeToken as string;
		} catch (error) {
			throw error;
		}
	};

	const getRewardToken = async () => {
		try {
			const rewardToken = await base.proxyContract?.rewardsToken();
			return rewardToken as string;
		} catch (error) {
			throw error;
		}
	};
	return {
		...base,
		getTotalSuply,
		getBalanceOf,
		getBalance,
		rewardPerToken,
		getEarned,
		stake,
		withdraw,
		claimReward,
		getStakeToken,
		getRewardToken,
	};
}
