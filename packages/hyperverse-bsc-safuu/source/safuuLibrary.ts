import { HyperverseConfig } from '@decentology/hyperverse';
import { EvmLibraryBase, getProvider } from '@decentology/hyperverse-evm';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { ethers } from 'ethers';
import { CancellablePromise, pseudoCancellable } from 'real-cancellable-promise';
import { getEnvironment } from './environment';
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';
import goldListJson from '../whitelist/gold-wallets.json';
import whiteListJson from '../whitelist/all-eligible-wallets.json';

export type ModuleLibraryType = Awaited<ReturnType<typeof ModuleLibraryInternal>>;
export function SafuuLibrary(
	...args: Parameters<typeof ModuleLibraryInternal>
): CancellablePromise<ModuleLibraryType> {
	return pseudoCancellable(ModuleLibraryInternal(...args));
}
type Whitelist = {
	address: string;
	gold?: 'true' | 'false';
};
let GOLDLIST: string[] = (goldListJson as Whitelist[]).map((x) => x.address);
let WHITELIST: string[] = (whiteListJson as Whitelist[]).map((x) => x.address);
if (process.env.GOLD_LIST) {
	GOLDLIST = process.env.GOLD_LIST.split(',');
}
if (process.env.WHITE_LIST) {
	WHITELIST = process.env.WHITE_LIST.split(',');
}

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
		const proof = _generateMerkleProof(GOLDLIST, signerAddress);
		try {
			const tx = await base.mintFullNode(fullNodeCount, proof);
			return tx.wait() as TransactionReceipt;
		} catch (error) {
			throw new Error(_parseError(error as Error));
		}
	};
	const mintLiteNode = async (lightNodeCount: number) => {
		try {
			const tx = await base.mintLiteNode(lightNodeCount);
			return tx.wait() as TransactionReceipt;
		} catch (error) {
			throw new Error(_parseError(error as Error));
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
		const cost = Number(await base.FULL_NODE_COST());
		return cost;
	};
	const getLiteNodeCost = async () => {
		const cost = Number(await base.LITE_NODE_COST());
		return cost;
	};
	const setLiteNodeCost = async (cost: number) => {
		const tx = await base.setLiteNodeCost(cost);
		return tx.wait() as TransactionReceipt;
	};
	const checkEligibility = (address: string, isGold: boolean = false) => {
		const target = keccak256(address.toLowerCase());
		let leafs = (isGold ? GOLDLIST : WHITELIST).map((address) =>
			keccak256(address.toLowerCase())
		);
		const merkleTree = new MerkleTree(leafs, keccak256, { sortPairs: true });
		const proof = merkleTree.getHexProof(target);
		return MerkleTree.verify(proof, target, merkleTree.getRoot());
	};
	const getGoldListMerkleRoot = async () => {
		const root = (await base._goldListMerkleRoot()) as string;
		return root;
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
	const getFullNodeSupply = async () => {
		const count = Number(await base.FULL_NODE_CURRENT_SUPPLY());
		return count;
	};
	const getFullNodeLimit = async () => {
		const count = Number(await base.FULL_NODE_LIMIT());
		return count;
	};
	const getLiteNodeLimit = async () => {
		const count = Number(await base.LITE_NODE_LIMIT());
		return count;
	};
	const getLiteNodeSupply = async () => {
		const count = Number(await base.LITE_NODE_CURRENT_SUPPLY());
		return count;
	};
	const getSafuuTokenAddress = async () => {
		const address = await base._safuuTokenAddress();
		return address;
	};
	const allowance = async () => {
		const tokenAddress = await getSafuuTokenAddress();
		const token = new ethers.Contract(
			tokenAddress,
			JSON.stringify([
				{
					name: 'allowance',
					inputs: [
						{
							internalType: 'address',
							name: 'owner',
							type: 'address',
						},
						{
							internalType: 'address',
							name: 'spender',
							type: 'address',
						},
					],
					outputs: [
						{
							internalType: 'uint256',
							name: '',
							type: 'uint256',
						},
					],
					stateMutability: 'view',
					type: 'function',
				},
			]),
			signer
		);
		const signerAddress = await signer.getAddress();
		const count = Number(await token.allowance(signerAddress, base.address));
		return count;
	};
	const approve = async (amount: number) => {
		const tokenAddress = await getSafuuTokenAddress();
		const token = new ethers.Contract(
			tokenAddress,
			JSON.stringify([
				{
					inputs: [
						{
							internalType: 'address',
							name: 'spender',
							type: 'address',
						},
						{
							internalType: 'uint256',
							name: 'amount',
							type: 'uint256',
						},
					],
					name: 'approve',
					outputs: [
						{
							internalType: 'bool',
							name: '',
							type: 'bool',
						},
					],
					stateMutability: 'nonpayable',
					type: 'function',
				},
			]),
			signer
		);
		const tx = await token.approve(base.address, amount);
		return tx.wait() as TransactionReceipt;
	};
	const hasTokenAllowance = async (amount: number) => {
		const hasTokenAllowance = await allowance();
		return hasTokenAllowance >= amount;
	};

	// ***** Private Methods *********

	const _parseError = (error: Error) => {
		const match = /reverted with reason string '(.*?)'/.exec(error.message);
		return match ? match[1] : error.message;
	};

	const _generateMerkleRoot = (addresses: string[]) => {
		const leafNodes = addresses.map((address) => keccak256(address.toLowerCase()));
		const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
		return '0x' + merkleTree.getRoot().toString('hex');
	};

	const _generateMerkleProof = (addresses: string[], address: string) => {
		const leafNodes = addresses.map((address) => keccak256(address.toLowerCase()));
		const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
		return merkleTree.getHexProof(keccak256(address.toLowerCase()));
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
		getFullNodeSupply,
		getLiteNodeSupply,
		isWhiteListSaleActive,
		isGoldListSaleActive,
		setWhiteListSaleStatus,
		setGoldListSaleStatus,
		getFullNodeCost,
		getLiteNodeCost,
		getLiteNodeLimit,
		approve,
		allowance,
		hasTokenAllowance,
		getFullNodeLimit,
	};
}
