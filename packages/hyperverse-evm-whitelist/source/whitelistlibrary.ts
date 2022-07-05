import { HyperverseConfig } from '@decentology/hyperverse';
import { EvmLibraryBase, getProvider } from '@decentology/hyperverse-evm';
import { ethers } from 'ethers';
import { getEnvironment } from './environment';
import { CancellablePromise, pseudoCancellable } from 'real-cancellable-promise';
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';
import { TransactionReceipt } from '@ethersproject/abstract-provider'

export type WhitelistLibraryType = Awaited<ReturnType<typeof WhitelistLibraryInternal>>;
export function WhitelistLibrary(
	...args: Parameters<typeof WhitelistLibraryInternal>
): CancellablePromise<WhitelistLibraryType> {
	return pseudoCancellable(WhitelistLibraryInternal(...args));
}

export async function WhitelistLibraryInternal(
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
	console.log('signer', providerOrSigner);

	const base = await EvmLibraryBase(
		'Whitelist',
		hyperverse,
		factoryAddress!,
		FactoryABI,
		ContractABI,
		providerOrSigner
	);


	const getWhitelistedAddresses = async () => {
		try {
			const addresses = await base.proxyContract?.whitelistedAddresses();
			return addresses;
		} catch (error) {
			throw error;
		}
	};

	const getAddressesClaimed = async () => {
		try {
			const addresses = await base.proxyContract?.addressesClaimed();
			return addresses;
		} catch (error) {
			throw error;
		}
	};

	const isWhitelisted = async (account: string) => {
		try {
			const check = await base.proxyContract?.whitelistedAddresses(account);
			return check;
		} catch (error) {
			throw error;
		}
	};

	const isWhitelistedMerkle = async (account: string) => {
		try {
			const addresses = await base.proxyContract?.whitelistedAddresses();
			const leafNodes = addresses.map((address: string) => keccak256(address));
			const tree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

			const check = await base.proxyContract?.checkMerkleWhitelist(
				account,
				tree.getHexProof(keccak256(account))
			);
			return check;
		} catch (error) {
			throw error;
		}
	};

	const hasClaimed = async (address: string) => {
		try {
			const check = await base.proxyContract?.addressesClaimed(address);
			return check;
		} catch (error) {
			throw error;
		}
	};
	const active = async () => {
		try {
			const active = await base.proxyContract?.active();
			return active;
		} catch (error) {
			throw error;
		}
	};
	const whitelist = async () => {
		try {
			const txn = await base.proxyContract?.getWhitelisted();
			return txn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};
	const claimWhitelist = async (account: string) => {
		try {
			const addresses = await base.proxyContract?.whitelistedAddresses();
			const leafNodes = addresses.map((address: string) => keccak256(address));
			const tree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

			const txn = await base.proxyContract?.claimWhitelist(
				account,
				tree.getHexProof(keccak256(account))
			);
			return txn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};
	const setMerkleRoot = async (root: string) => {
		try {
			const txn = await base.proxyContract?.updateMerkleRoot(root);
			return txn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	const activateClaiming = async () => {
		try {
			const txn = await base.proxyContract?.activateWhitelistClaiming();
			return txn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};
	const deactivateClaiming = async () => {
		try {
			const txn = await base.proxyContract?.deactivateWhitelistClaiming();
			return txn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};
	const authorizeOperator = async (operator: string) => {
		try {
			const txn = await base.proxyContract?.authorizeOperator(operator);
			return txn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	const revokeOperator = async (operator: string) => {
		try {
			const txn = await base.proxyContract?.revokeOperator(operator);
			return txn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};

	return {
		...base,
		getWhitelistedAddresses,
		getAddressesClaimed,
		isWhitelisted,
		isWhitelistedMerkle,
		hasClaimed,
		active,
		whitelist,
		claimWhitelist,

		//Admin Functionality
		setMerkleRoot,
		activateClaiming,
		deactivateClaiming,
		authorizeOperator,
		revokeOperator,
	};
}
