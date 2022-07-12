import { HyperverseConfig } from '@decentology/hyperverse';
import { EvmLibraryBase, getProvider } from '@decentology/hyperverse-evm';
import { ethers, BigNumber } from 'ethers';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { CancellablePromise, pseudoCancellable } from 'real-cancellable-promise';
import { getEnvironment } from './environment';

export type NFTGameLibraryType = Awaited<ReturnType<typeof NFTGameLibraryInternal>>;
export function NFTGameLibrary(
	...args: Parameters<typeof NFTGameLibraryInternal>
): CancellablePromise<NFTGameLibraryType> {
	return pseudoCancellable(NFTGameLibraryInternal(...args));
}

export async function NFTGameLibraryInternal(
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
		'NFTGame',
		hyperverse,
		factoryAddress!,
		FactoryABI,
		ContractABI,
		providerOrSigner
	);

	type MetaData = {
		tokenName: string;
		eyeId: number;
		mouthId: number;
		bodyId: number;
		level: number;
		standardChoices: number[];
		standardOptions: number[];
		specialChoices: number[];
		specialOptions: number[];
	};
	type MintType = {
		to: string;
	} & MetaData;

	const mint = async ({
		to,
		tokenName,
		eyeId,
		mouthId,
		bodyId,
		level,
		standardChoices,
		standardOptions,
		specialChoices,
		specialOptions,
	}: MintType) => {
		try {
			const mintTxn = await base.proxyContract?.mint(
				to,
				tokenName,
				eyeId,
				mouthId,
				bodyId,
				level,
				standardChoices,
				standardOptions,
				specialChoices,
				specialOptions
			);
			return mintTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	const getAttributes = async (tokenId: number) => {
		try {
			const attrs = await base.proxyContract?.getAttributesByTokenId(tokenId);
			return attrs;
		} catch (error) {
			throw error;
		}
	};

	const levelUp = async(tokenId: number) {
		try {
			const toggleTxn = await base.proxyContract?.levelUp(tokenId);
			return toggleTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	}

	const modifyDynamicAttributes = async (tokenId: number, attributes: number[]) => { 
		try {
			const tx = await base.proxyContract?.modifyDynamicAttributes(tokenId, attributes);
			return tx.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	}

	const setDynamicAttributes = async (tokenId: number, attributes: number[]) => { 
		try {
			const tx = await base.proxyContract?.setDynamicAttributes(tokenId, attributes);
			return tx.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	}

	const getAttributesByTokenId = async (tokenId: number) => { 
		try {
			const attrs = await base.proxyContract?.getAttributesByTokenId(tokenId);
			return attrs;
		} catch (error) {
			throw error;
		}
	}

	const setMintPermissions = async (isPublic: boolean) => {
		try {
			const toggleTxn = await base.proxyContract?.setMintPermissions(isPublic);
			return toggleTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	const tenantMint = async ({
		to,
		tokenName,
		eyeId,
		mouthId,
		bodyId,
		level,
		standardChoices,
		standardOptions,
		specialChoices,
		specialOptions
	}: MintType) => {
		try {
			const mintTxn = await base.proxyContract?.tenantMint(
				to,
				tokenName,
				eyeId,
				mouthId,
				bodyId,
				level,
				standardChoices,
				standardOptions,
				specialChoices,
				specialOptions
			);
			return mintTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	const setBaseURI = async (baseURI: string) => {
		try {
			const setBaseURITxn = await base.proxyContract?.setBaseURI(baseURI);
			return setBaseURITxn.wait() as TransactionReceipt;
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
	};

	const withdraw = async () => {
		try {
			const withdrawTxn = await base.proxyContract?.withdraw();
			return withdrawTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	const withdrawTokens = async () => { 
		try {
			const tx = await base.proxyContract?.withdrawTokens();
			return tx.wait() as TransactionReceipt;
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
	};

	const supportsInterface = async (interfaceId: string) => { 
		try {
			const supportsInterface = await base.proxyContract?.supportsInterface(interfaceId);
			return supportsInterface;
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

	const getName = async () => {
		try {
			const name = (await base.proxyContract?.name()) as string;
			return name;
		} catch (error) {
			throw error;
		}
	};

	const getSymbol = async () => {
		try {
			const name = (await base.proxyContract?.symbol()) as string;
			return name;
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
			const transferTxn = await base.proxyContract?.transferFrom(from, to, tokenId);
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

	const getApproved = async (tokenId: number) => { 
		try {
			const approved = await base.proxyContract?.getApproved(tokenId);
			return approved;
		} catch (error) {
			throw error;
		}
	}

	const setApprovalForAll = async ({
		operator,
		approved,
	}: {
		operator: string;
		approved: boolean;
	}) => {
		try {
			const setApprovalTxn = await base.proxyContract?.setApprovalForAll(operator, approved);
			return setApprovalTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	const isApprovedForAll = async ({owner, operator}: {owner: string, operator:string}) => {
		try {
			const isApprovedForAll = await base.proxyContract?.isApprovedForAll(owner, operator);
			return isApprovedForAll;
		} catch (error) {
			throw error;
		}
	}


	const transferFrom = async ({from, to, tokenId}: {from: string, to: string, tokenId: number}) => {
		try {
			const transferFromTxn = await base.proxyContract?.transferFrom(from, to, tokenId);
			return transferFromTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	}

	return {
		...base,
		getAttributes,
		mint,
		setMintPermissions,
		tenantMint,
		getBaseURI,
		setBaseURI,
		withdraw,
		tokenURI,
		getBalanceOf,
		getOwnerOf,
		transfer,
		approve,
		setApprovalForAll,
	};
}
