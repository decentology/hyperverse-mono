import { HyperverseConfig } from '@decentology/hyperverse';
import { EvmLibraryBase, getProvider } from '@decentology/hyperverse-evm';
import { ethers, BigNumber } from 'ethers';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { CancellablePromise, pseudoCancellable } from 'real-cancellable-promise';
import { getEnvironment } from './environment';
export type ERC777LibraryType = Awaited<ReturnType<typeof ERC777LibraryInternal>>;

export function ERC777Library(
	...args: Parameters<typeof ERC777LibraryInternal>
): CancellablePromise<ERC777LibraryType> {
	return pseudoCancellable(ERC777LibraryInternal(...args));
}

export async function ERC777LibraryInternal(
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
		'ERC777',
		hyperverse,
		factoryAddress!,
		FactoryABI,
		ContractABI,
		providerOrSigner
	);

	const getTokenName = async () => {
		try {
			const name = await base.proxyContract?.name();
			return name as string;
		} catch (error) {
			throw error;
		}
	};

	const getTokenSymbol = async () => {
		try {
			const symbol = await base.proxyContract?.symbol();
			return symbol as string;
		} catch (error) {
			throw error;
		}
	};

	const getDecimal = async () => {
		try {
			const decimal = await base.proxyContract?.decimals();
			return decimal as number;
		} catch (error) {
			throw error;
		}
	};

	const getGranularity = async () => {
		try {
			const granularity = await base.proxyContract?.granularity();
			return granularity as number;
		} catch (error) {
			throw error;
		}
	};

	const getTotalSuply = async () => {
		try {
			const totalSupply = await base.proxyContract?.totalSupply();
			return BigNumber.from(totalSupply).toNumber();
		} catch (error) {
			throw error;
		}
	};

	const getBalanceOf = async (account: string) => {
		try {
			const balance = await base.proxyContract?.balanceOf(account);
			return BigNumber.from(balance).toNumber();
		} catch (error) {
			throw error;
		}
	};

	const send = async ({ to, amount, data }: { to: string; amount: number; data: string }) => {
		try {
			const transferTxn = await base.proxyContract?.send(
				to,
				amount,
				ethers.utils.formatBytes32String(data)
			);
			return transferTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	const transfer = async ({ to, amount }: { to: string; amount: number }) => {
		try {
			const transferTxn = await base.proxyContract?.transfer(to, amount);
			return transferTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	const transferFrom = async ({
		from,
		to,
		amount,
	}: {
		from: string;
		to: string;
		amount: number;
	}) => {
		try {
			const transferTxn = await base.proxyContract?.transferFrom(from, to, amount);
			return transferTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	const allowance = async (owner: string, spender: string) => {
		try {
			console.log('in the try', owner, spender)
			const allowance = await base.proxyContract?.allowance(owner, spender);
			console.log('after contract call');
			return BigNumber.from(allowance).toNumber();
		} catch (error) {
			throw error;
		}
	};

	const approve = async ({ spender, amount }: { spender: string; amount: number }) => {
		try {
			const approveTxn = await base.proxyContract?.approve(spender, amount);
			return approveTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	const getDefaultOperators = async () => {
		try {
			const operators = await base.proxyContract?.defaultOperators();
			return operators;
		} catch (error) {
			throw error;
		}
	};

	const checkOperator = async ({
		operator,
		tokenHolder,
	}: {
		operator: string;
		tokenHolder: string;
	}) => {
		try {
			const isOperator = await base.proxyContract?.isOperatorFor(operator, tokenHolder);
			return isOperator;
		} catch (error) {
			throw error;
		}
	};

	const authorizeOperator = async (operator: string) => {
		try {
			const authorizeTxn = await base.proxyContract?.authorizeOperator(operator);
			return authorizeTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	const revokeOperator = async (operator: string) => {
		try {
			const revokeTxn = await base.proxyContract?.revokeOperator(operator);
			return revokeTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	const operatorSend = async ({
		sender,
		recipient,
		amount,
		data,
		operatorData,
	}: {
		sender: string;
		recipient: string;
		amount: number;
		data: string;
		operatorData: string;
	}) => {
		try {
			const operatorSendTxn = await base.proxyContract?.operatorSend(
				sender,
				recipient,
				amount,
				ethers.utils.formatBytes32String(data),
				ethers.utils.formatBytes32String(operatorData)
			);
			return operatorSendTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	const operatorBurn = async ({
		account,
		amount,
		data,
		operatorData,
	}: {
		account: string;
		amount: number;
		data: string;
		operatorData: string;
	}) => {
		try {
			const operatorBurnTxn = await base.proxyContract?.operatorBurn(
				account,
				amount,
				ethers.utils.formatBytes32String(data),
				ethers.utils.formatBytes32String(operatorData)
			);
			return operatorBurnTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	const burn = async ({ amount, data }: { amount: number; data: string }) => {
		try {
			const burnTxn = await base.proxyContract?.burn(
				amount,
				ethers.utils.formatBytes32String(data)
			);
			return burnTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	const mint = async (amount: number) => {
		try {
			const mintTxn = await base.proxyContract?.mint(amount);
			return mintTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	return {
		...base,
		getTokenName,
		getTokenSymbol,
		getDecimal,
		getGranularity,
		getTotalSuply,
		getBalanceOf,
		send,
		transfer,
		transferFrom,
		allowance,
		approve,
		getDefaultOperators,
		checkOperator,
		authorizeOperator,
		revokeOperator,
		operatorSend,
		operatorBurn,
		burn,
		mint,
	};
}
