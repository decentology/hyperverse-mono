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

	const mint = async () => {
		try {
			const mintTxn = await base.proxyContract?.mint();
			return mintTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};


	const ownerMint = async (to: string) => {
		try {
			const mintTxn = await base.proxyContract?.tenantMint(to);
			return mintTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	const getBaseURI = async () => {
		try {
			const baseURI = await base.proxyContract?.getBaseURI();
			return baseURI;
		} catch (error) {
			throw error;
		}
	}

	const setMintPrice = async (price: number) => {
		try {
			const setMintPriceTxn = await base.proxyContract?.setMintPrice(price)
			return setMintPriceTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	}

	const setBaseURI = async (baseURI: string) => {
		try {
			const setBaseURITxn = await base.proxyContract?.setBaseURI(baseURI)
			return setBaseURITxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	}

	const setPublicSale = async (publicSale: boolean) => {
		try {
			const setPublicSalesTxn = await base.proxyContract?.setPublicSales(publicSale)
			return setPublicSalesTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	}

	const withdraw = async () => {
		try {
			const withdrawTxn = await base.proxyContract?.withdraw();
			return withdrawTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	}

	const tokenURI = async (tokenId: number) => {
		try {
			const tokenURI = await base.proxyContract?.tokenURI(tokenId);
			return tokenURI;
		} catch (error) {
			throw error;
		}
	}




	const getBalanceOf = async (account: string) => {
		try {
			const balance = await base.proxyContract?.balanceOf(account);
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

	const setApprovalForAll = async ({ operator, approved }: { operator: string; approved: boolean }) => {
		try {
			const setApprovalTxn = await base.proxyContract?.setApprovalForAll(to, approved);
			return setApprovalTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	return {
		...base,
		mint,
		ownerMint,
		getBaseURI,
		setMintPrice,
		setBaseURI,
		setPublicSale,
		withdraw,
		tokenURI,
		getBalanceOf,
		getOwnerOf,
		transfer,
		approve,
		setApprovalForAll,
	};
}
