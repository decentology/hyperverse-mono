import { HyperverseConfig } from '@decentology/hyperverse';
import { EvmLibraryBase, getProvider } from '@decentology/hyperverse-evm';
import { ethers, BigNumber } from 'ethers';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { CancellablePromise, pseudoCancellable } from 'real-cancellable-promise';
import { getEnvironment } from './environment';
import { CollectionInfo } from './types';

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

	const initializeCollection = async ({
		price,
		maxSupply,
		maxPerUser,
	}: {
		price: number;
		maxSupply: number;
		maxPerUser: number;
	}) => {
		try {
			const tnx = await base.proxyContract?.initializeCollection(
				ethers.utils.parseEther(price.toString()),
				maxSupply,
				maxPerUser,
				{ gasLimit: '1000000' }
			);
			return tnx.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	const mint = async (to: string, amount?: number) => {
		try {
			const collectionInfo = await getCollectionInfo();
			if (!amount || amount == 1) {
				const mintTxn = await base.proxyContract?.mint(to, {
					value: collectionInfo.price.toString(),
					gasLimit: '1000000',
				});
				return mintTxn.wait() as TransactionReceipt;
			}

			const mintTxn = await base.proxyContract?.mintBatch(to, amount, {
				gasLimit: '1000000',
				value: (collectionInfo.price.toNumber() * amount).toString(),
			});
			return mintTxn.wait() as TransactionReceipt;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const setMintPermissions = async (isPublic: boolean) => {
		try {
			const toggleTxn = await base.proxyContract?.setMintPermissions(isPublic);
			return toggleTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	const lockCollection = async () => {
		try {
			const toggleTxn = await base.proxyContract?.lockCollection();
			return toggleTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	const tenantMint = async ({ image, to }: { image?: File; to: string }) => {
		try {
			const erc72Name = await base.proxyContract?.name();
			if (image) {
				const tokenUri = await hyperverse.storage?.uploadFile(image);
				const Metadata = {
					image: `https://ipfs.io/ipfs/${tokenUri}`,
					name: `${erc72Name}`,
				};
				const metadataFile = new File([JSON.stringify(Metadata)], 'metadata.json');
				const metadataFileLink = await hyperverse!.storage!.uploadFile(metadataFile);

				const mintTxn = await base.proxyContract?.['tenantMint(address,string)'](
					to,
					metadataFileLink,
					{
						gasLimit: '1000000',
					}
				);
				return mintTxn.wait() as TransactionReceipt;
			} else {
				const mintTxn = await base.proxyContract?.['tenantMint(address)'](to);
				return mintTxn.wait() as TransactionReceipt;
			}
		} catch (error) {
			console.log(error);
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
			const withdrawTxn = await base.proxyContract?.['withdraw()']();
			return withdrawTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	const tokenURI = async (tokenId: number) => {
		try {
			const tokenURI = await base.proxyContract?.tokenURI(tokenId);
			return tokenURI;
		} catch (error) {
			throw error;
		}
	};

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
			const owner = (await base.proxyContract?.ownerOf(tokenId)) as string;
			return owner;
		} catch (error) {
			throw error;
		}
	};

	const getCollectionInfo = async () => {
		try {
			const collectionInfo = (await base.proxyContract?.collectionInfo()) as CollectionInfo;
			return collectionInfo;
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

	const getTokenCounter = async () => {
		try {
			const tokenCounter = (await base.proxyContract?.tokenCounter()) as BigNumber;
			return tokenCounter;
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

	const contractBalance = async () => {
		try {
			const balance = await base.proxyContract?.provider.getBalance(
				base.proxyContract?.address
			);
			return balance;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

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

	return {
		...base,
		initializeCollection,
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
		getCollectionInfo,
		getName,
		getSymbol,
		getTokenCounter,
		lockCollection ,
		contractBalance,
	};
}
