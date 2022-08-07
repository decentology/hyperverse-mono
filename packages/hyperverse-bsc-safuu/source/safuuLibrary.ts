import { HyperverseConfig } from '@decentology/hyperverse';
import { EvmLibraryBase, getProvider } from '@decentology/hyperverse-evm';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { ethers } from 'ethers';
import { CancellablePromise, pseudoCancellable } from 'real-cancellable-promise';
import { getEnvironment } from './environment';
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

export type ModuleLibraryType = Awaited<ReturnType<typeof ModuleLibraryInternal>>;
export function SafuuLibrary(
	...args: Parameters<typeof ModuleLibraryInternal>
): CancellablePromise<ModuleLibraryType> {
	return pseudoCancellable(ModuleLibraryInternal(...args));
}

const GOLDLIST: string[] = [
	'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
	'0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
	'0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
];
const WHITELIST: string[] = [
	'0x90F79bf6EB2c4f870365E785982E1f101E93b906',
	'0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
	'0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
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
	}

	const mintGoldList = async (fullNodeCount: number, lightNodeCount: number) => {
		const signerAddress = await signer?.getAddress();
		const proof = generateMerkleProof(GOLDLIST, signerAddress);
		try {
			const tx = base.mintGoldList(fullNodeCount, lightNodeCount, proof);
			return tx.wait() as TransactionReceipt;
		} catch (error) {
			// TODO: Can fail if gold list is not active
		}
	};
	const mintWhiteList = async (fullNodeCount: number, lightNodeCount: number) => {
		const signerAddress = await signer?.getAddress();
		const proof = generateMerkleProof(WHITELIST, signerAddress);
		const tx = base.mintWhiteList(fullNodeCount, lightNodeCount, proof);
		return tx.wait() as TransactionReceipt;
	};
	const withdrawFunds = async () => {
		const tx = base.withdrawFunds();
		return tx.wait() as TransactionReceipt;
	};
	const withdrawTokens = async (tokenContract: string, toAddress: string) => {
		const tx = base.withdrawTokens(tokenContract, toAddress);
		return tx.wait() as TransactionReceipt;
	};
	const burn = async (tokenId: number, amount: number) => {
		const tx = base.burn(tokenId, amount);
		return tx.wait() as TransactionReceipt;
	};
	const setFullNodeCost = async (cost: number) => {
		const tx = base.setFullNodeCost(cost);
		return tx.wait() as TransactionReceipt;
	};
	const setLiteNodeCost = async (cost: number) => {
		const tx = base.setLiteNodeCost(cost);
		return tx.wait() as TransactionReceipt;
	};
	const checkEligibility = (address: string) => {
		const target = keccak256(address);
		const leafs = WHITELIST.map((address) => keccak256(address));
		const merkleTree = new MerkleTree(leafs, keccak256, { sortPairs: true });
		const proof = merkleTree.getHexProof(target);
		return MerkleTree.verify(proof, target, merkleTree.getRoot());
	};
	const getGoldListMerkleRoot = async () => {
		try {
			const root = (await base._goldListMerkleRoot()) as string;
			return root;
		} catch (error) {
			throw error;
		}
	};
	const getWhiteListMerkleRoot = async () => {
		try {
			const root = (await base._whiteListMerkleRoot()) as string;
			return root;
		} catch (error) {
			throw error;
		}
	};
	const setURI = (tokenId: number, uri: string) => {
		const tx = base.setURI(tokenId, uri);
		return tx.wait() as TransactionReceipt;
	};
	const getURI = async (tokenId: number) => {
		try {
			const uri = (await base.uri()) as string;
			return uri;
		} catch (error) {
			throw error;
		}
	};
	const setGoldListSaleStatus = async (status: boolean) => { 
		const tx = await base.setGoldListSaleStatus(status);
		return tx.wait() as TransactionReceipt;
	}
	const setWhiteListSaleStatus = async (status: boolean) => { 
		const tx = await base.setWhiteListSaleStatus(status);
		return tx.wait() as TransactionReceipt;
	}
	const isGoldListSaleActive = async () => {
		try {
			const result = (await base._isGoldListSaleActive()) as boolean;
			return result;
		} catch (error) {
			throw error;
		}
	};
	const isWhiteListSaleActive = async () => {
		try {
			const result = (await base._isWhiteListSaleActive()) as boolean;
			return result;
		} catch (error) {
			throw error;
		}
	};
	const getName = async () => {
		try {
			const name = (await base.name()) as string;
			return name;
		} catch (error) {
			throw error;
		}
	};
	const getSymbol = async () => {
		try {
			const name = (await base.symbol()) as string;
			return name;
		} catch (error) {
			throw error;
		}
	};
	const fullNodeSupply = async () => {
		try {
			const count = (await base.FULL_NODE_CURRENT_SUPPLY()) as number;
			return count;
		} catch (error) {
			throw error;
		}
	};
	const liteNodeSupply = async () => {
		try {
			const count = (await base.LITE_NODE_CURRENT_SUPPLY()) as number;
			return count;
		} catch (error) {
			throw error;
		}
	};

	// ***** Private Methods *********

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
		mintGoldList,
		mintWhiteList,
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
	};
}
