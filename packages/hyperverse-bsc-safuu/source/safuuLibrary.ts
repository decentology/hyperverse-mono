import { HyperverseConfig } from "@decentology/hyperverse";
import { EvmLibraryBase, getProvider } from "@decentology/hyperverse-evm";
import { TransactionReceipt } from "@ethersproject/abstract-provider";
import { ethers } from "ethers";
import { CancellablePromise, pseudoCancellable } from "real-cancellable-promise";
import { getEnvironment } from "./environment";
import { MerkleTree } from 'merkletreejs'
import keccak256 from 'keccak256'

export type ModuleLibraryType = Awaited<ReturnType<typeof ModuleLibraryInternal>>;
export function SafuuLibrary(...args: Parameters<typeof ModuleLibraryInternal>): CancellablePromise<ModuleLibraryType> {
	return pseudoCancellable(ModuleLibraryInternal(...args));
}

const GOLDLIST: string[] = [];
const WHITELIST: string[] = [];

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

	const mintFullNode = async (amount: number) => {
		const tx = base.mintFullNode(amount, await signer?.getAddress());
		return tx.await() as TransactionReceipt;
	}


	const checkEligibility = (address: string) => {
		const target = keccak256(address);
		const leafs = WHITELIST.map(address => keccak256(address));
		const merkleTree = new MerkleTree(leafs, keccak256, { sortPairs: true });
		const proof = merkleTree.getHexProof(target);
		return MerkleTree.verify(proof, target, merkleTree.getRoot())
	}

	const mintLiteNode = async (amount: number) => {
		const tx = base.mintLiteNode(amount, await signer?.getAddress());
		return tx.await() as TransactionReceipt;
	}


	return {
		checkEligibility,
		mintFullNode,
	}
}

