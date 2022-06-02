import { HyperverseConfig } from '@decentology/hyperverse';
import { EvmLibraryBase, getProvider } from '@decentology/hyperverse-evm';
import { ethers, BigNumber } from 'ethers';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { CancellablePromise, pseudoCancellable } from 'real-cancellable-promise';
import { getEnvironment } from './environment';

export type ERC721LibraryType = Awaited<ReturnType<typeof ERC721LibraryInternal>>;
export function ERC721Library(
	...args: Parameters<typeof ERC721LibraryInternal>
): CancellablePromise<ERC721LibraryType> {
	return pseudoCancellable(ERC721LibraryInternal(...args));
}

export async function ERC721LibraryInternal(
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
		'ERC721',
		hyperverse,
		factoryAddress!,
		FactoryABI,
		ContractABI,
		providerOrSigner
	);

	const getBalanceOf = async (account: string) => {
		try {
			const balance = await base.proxyContract?.balanceOf(account);
			return BigNumber.from(balance) as BigNumber;
		} catch (error) {
			throw error;
		}
	};

	const getBalance = async () => {
		try {
			const balance = await base.proxyContract?.balance();
			return BigNumber.from(balance) as BigNumber;
		} catch (error) {
			throw error;
		}
	};

	const getOwnerOf = async (tokenId: string) => {
		try {
			const owner = await base.proxyContract?.ownerOf(tokenId);
			return owner;
		} catch (error) {
			throw error;
		}
	};

	const togglePublicMint = async () => {
		try {
			const toggle = await base.proxyContract?.togglePublicMint();
			return toggle.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	const mint = async (to: string) => {
		try {
			console.log(base.proxyContract?.signer);
			const mintTxn = await base.proxyContract?.mint(to);
			return mintTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	const transfer = async ({
		from,
		to,
		tokenId,
	}: {
		from: string;
		to: string;
		tokenId: number;
	}) => {
		try {
			const transferTxn = await base.proxyContract?.tcdransferFrom(from, to, tokenId);
			return transferTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	const approve = async ({ to, tokenId }: { to: string; tokenId: number }) => {
		try {
			const approveTxn = await base.proxyContract?.approve(to, tokenId);
			return approveTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	const setApprovalForAll = async ({ to, approved }: { to: string; approved: boolean }) => {
		try {
			const setApprovalTxn = await base.proxyContract?.setApprovalForAll(to, approved);
			return setApprovalTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	return {
		...base,
		getBalanceOf,
		getBalance,
		getOwnerOf,
		togglePublicMint,
		mint,
		transfer,
		approve,
		setApprovalForAll,
	};
}
