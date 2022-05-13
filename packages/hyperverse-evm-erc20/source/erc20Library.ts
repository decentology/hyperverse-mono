import { HyperverseConfig } from '@decentology/hyperverse';
import { EvmLibraryBase, getProvider } from '@decentology/hyperverse-evm';
import { ethers, BigNumber, constants } from 'ethers';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { CancellablePromise } from 'real-cancellable-promise';
import { getEnvironment } from './environment';

export type ERC20LibraryType = Awaited<ReturnType<typeof ERC20LibraryInternal>>;

export function ERC20Library(...args: Parameters<typeof ERC20LibraryInternal>): CancellablePromise<ERC20LibraryType> {
	return new CancellablePromise(ERC20LibraryInternal(...args), () => { });
}

export async function ERC20LibraryInternal(
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
		'ERC20',
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

  const transfer = async (to: string, amount: number) => {
    try {
      const transferTxn = await base.proxyContract?.transfer(to, amount);
      return transferTxn.wait() as TransactionReceipt
    } catch (error) {
      throw error 
    }
  }

  const transferFrom = async (from: string, to: string, amount: number) => {
    try {
      const transferTxn = await base.proxyContract?.transferFrom(from, to, amount);
      return transferTxn.wait() as TransactionReceipt
    } catch (error) {
      throw error
    }
  }

  const allowance = async (owner: string, spender: string) => {
    try {
      const allowance = await base.proxyContract?.allowance(owner, spender);
      return BigNumber.from(allowance) as Number;
    } catch (error) {
      throw error;
    }
  }

  const approve = async (spender: string, amount: number) => {
    try {
      const approveTxn = await base.proxyContract?.approve(spender, amount);
      return approveTxn.wait() as TransactionReceipt
    } catch (error) {
      throw error
    }
  }

  const mint = async (amount: number) => {
    try {
      const mintTxn = await base.proxyContract?.mint(amount);
      return mintTxn.wait() as TransactionReceipt
    } catch (error) {
      throw error
    }
  }

  const burn = async (amount: number) => {
    try {
      const burnTxn = await base.proxyContract?.burn(amount);
      return burnTxn.wait() as TransactionReceipt
    } catch (error) {
      throw error
    }
  }

  const getTokenName = async () => {
    try {
      const name = await base.proxyContract?.name();
      return name as string;
    } catch (error) {
      throw error;
    }
  }

  const getTokenSymbol = async () => {
    try {
      const symbol = await base.proxyContract?.symbol();
      return symbol as string;
    } catch (error) {
      throw error;
    }
  }

  return {
    ...base,
    getTotalSuply,
    getBalanceOf,
    getBalance,
    transfer,
    transferFrom,
    allowance,
    approve,
    mint,
    burn,
    getTokenName,
    getTokenSymbol
  }

}
