import { HyperverseConfig } from '@decentology/hyperverse';
import { EvmLibraryBase, getProvider } from '@decentology/hyperverse-evm';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { ethers } from 'ethers';
import { CancellablePromise, pseudoCancellable } from 'real-cancellable-promise';
import { getEnvironment } from './environment';
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';
import goldListJson from '../whitelist/gold-wallets.json'
import whiteListJson from '../whitelist/all-eligible-wallets.json'

export type ModuleLibraryType = Awaited<ReturnType<typeof ModuleLibraryInternal>>;
export function SafuuLibrary(
	...args: Parameters<typeof ModuleLibraryInternal>
): CancellablePromise<ModuleLibraryType> {
	return pseudoCancellable(ModuleLibraryInternal(...args));
}

const GOLDLIST: string[] = (goldListJson).map(x => x.address);
const WHITELIST: string[] = (whiteListJson).map(x => x.address);

const REVERT_MESSAGES = [
	'Exceeds max 1 Full Node limit per address',
	'Purchase would exceed max Full Node supply',
	'Insufficient balance',
	'Exceeds max 5 Lite Node limit per address',
	'Purchase would exceed max Lite Node supply',
	'Max 1 FullNode, 5 LiteNodes per wallet',
	'Insufficient balance',
	'Max 1 FullNode, 5 LiteNodes per wallet',
	'Full node and Lite node count cannot be zero',
	'GoldList sale not active',
	'WhiteList sale not active',
	'Address not eligible - Invalid merkle proof',
];

async function ModuleLibraryInternal(
	hyperverse: HyperverseConfig,
	providerOrSigner?: ethers.providers.Provider | ethers.Signer
) {
	const { ContractABI, contractAddress } = getEnvironment(
		hyperverse.blockchain?.name!,
		hyperverse.network
	);
	if (!providerOrSigner) {
		providerOrSigner = getProvider(hyperverse.network);
	}

	const base = new ethers.Contract(contractAddress!, ContractABI, providerOrSigner);
	let signer: ethers.Signer;
	if (providerOrSigner instanceof ethers.providers.Web3Provider) {
		signer = providerOrSigner.getSigner();
	} else if (providerOrSigner instanceof ethers.Signer) {
		signer = providerOrSigner;
	}

	const mintFullNode = async (fullNodeCount: number) => {
		const signerAddress = await signer?.getAddress();
		const proof = generateMerkleProof(GOLDLIST, signerAddress);
		try {
			const tx = await base.mintFullNode(fullNodeCount, proof);
			return tx.wait() as TransactionReceipt;
		} catch (error) {
			throw new Error(parseError(error as Error));
		}
	};
	const mintLiteNode = async (lightNodeCount: number) => {
		try {
			const tx = await base.mintLiteNode(lightNodeCount);
			return tx.wait() as TransactionReceipt;
		} catch (error) {
			throw new Error(parseError(error as Error));
		}
	};
	const withdrawFunds = async () => {
		const tx = await base.withdrawFunds();
		return tx.wait() as TransactionReceipt;
	};
	const withdrawTokens = async (tokenContract: string, toAddress: string) => {
		const tx = await base.withdrawTokens(tokenContract, toAddress);
		return tx.wait() as TransactionReceipt;
	};
	const burn = async (tokenId: number, amount: number) => {
		const tx = await base.burn(tokenId, amount);
		return tx.wait() as TransactionReceipt;
	};
	const setFullNodeCost = async (cost: number) => {
		const tx = await base.setFullNodeCost(cost);
		return tx.wait() as TransactionReceipt;
	};
	const getFullNodeCost = async () => {
		return Number(await base.FULL_NODE_COST());
	};
	const getLiteNodeCost = async () => {
		return Number(await base.LITE_NODE_COST());
	};
	const setLiteNodeCost = async (cost: number) => {
		const tx = await base.setLiteNodeCost(cost);
		return tx.wait() as TransactionReceipt;
	};
	const checkEligibility = (address: string, isGold: boolean = false) => {
		const target = keccak256(address);
		const leafs = (isGold ? GOLDLIST : WHITELIST).map((address) => keccak256(address));
		const merkleTree = new MerkleTree(leafs, keccak256, { sortPairs: true });
		const proof = merkleTree.getHexProof(target);
		return MerkleTree.verify(proof, target, merkleTree.getRoot());
	};
	const getGoldListMerkleRoot = async () => {
		return (await base._goldListMerkleRoot()) as string;
	};
	const getWhiteListMerkleRoot = async () => {
		const root = (await base._whiteListMerkleRoot()) as string;
		return root;
	};
	const setURI = async (tokenId: number, uri: string) => {
		const tx = await base.setURI(tokenId, uri);
		return tx.wait() as TransactionReceipt;
	};
	const getURI = async (tokenId: number) => {
		const uri = (await base.uri(tokenId)) as string;
		return uri;
	};
	const setGoldListSaleStatus = async (status: boolean) => {
		const tx = await base.setGoldListSaleStatus(status);
		return tx.wait() as TransactionReceipt;
	};
	const setWhiteListSaleStatus = async (status: boolean) => {
		const tx = await base.setWhiteListSaleStatus(status);
		return tx.wait() as TransactionReceipt;
	};
	const isGoldListSaleActive = async () => {
		const result = (await base._isGoldListSaleActive()) as boolean;
		return result;
	};
	const isWhiteListSaleActive = async () => {
		const result = (await base._isWhiteListSaleActive()) as boolean;
		return result;
	};
	const getName = async () => {
		const name = (await base.name()) as string;
		return name;
	};
	const getSymbol = async () => {
		const name = (await base.symbol()) as string;
		return name;
	};
	const fullNodeSupply = async () => {
		const count = Number(await base.FULL_NODE_CURRENT_SUPPLY());
		return count;
	};
	const fullNodeLimit = async () => {
		const count = Number(await base.FULL_NODE_LIMIT());
		return count;
	};
	const liteNodeLimit = async () => {
		const count = Number(await base.LITE_NODE_LIMIT());
		return count;
	};
	const liteNodeSupply = async () => {
		const count = Number(await base.LITE_NODE_CURRENT_SUPPLY());
		return count;
	};

	// ***** Private Methods *********

	const parseError = (error: Error) => {
		const match = /reverted with reason string '(.*?)'/.exec(error.message);
		return match ? match[1] : error.message;
	};

	const generateMerkleRoot = (addresses: string[]) => {
		const leafNodes = addresses.map((address) => keccak256(address));
		const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
		return '0x' + merkleTree.getRoot().toString('hex');
	};

	const generateMerkleProof = (addresses: string[], address: string) => {
		const leafNodes = addresses.map((address) => keccak256(address));
		const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
		return merkleTree.getHexProof(keccak256(address));
	};

	// ***** End Private Methods *****

	return {
		contract: base,
		checkEligibility,
		mintFullNode,
		mintLiteNode,
		getName,
		getSymbol,
		getURI,
		setURI,
		getGoldListMerkleRoot,
		getWhiteListMerkleRoot,
		withdrawTokens,
		withdrawFunds,
		setFullNodeCost,
		setLiteNodeCost,
		burn,
		fullNodeSupply,
		liteNodeSupply,
		isWhiteListSaleActive,
		isGoldListSaleActive,
		setWhiteListSaleStatus,
		setGoldListSaleStatus,
		getFullNodeCost,
		getLiteNodeCost,
		liteNodeLimit,
		fullNodeLimit,
	};
}
