import { HyperverseConfig } from '@decentology/hyperverse';
import { BaseLibrary, getProvider } from '@decentology/hyperverse-evm';
import { ethers } from 'ethers';
import { getEnvironment } from '../environment';
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

export type WhitelistLibraryType = Awaited<ReturnType<typeof WhitelistLibrary>>;

export async function WhitelistLibrary(
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

	const base = await BaseLibrary(
		hyperverse,
		factoryAddress!,
		FactoryABI,
		ContractABI,
		providerOrSigner
	);

	const errors = (err: any) => {
		if (!base.factoryContract?.signer) {
			throw new Error('Please connect your wallet!');
		}

		if (err.code === 4001) {
			throw new Error('You rejected the transaction!');
		}

		throw err;
	};

	return {
		...base,
		getTotalTenants: async () => {
			try {
				const tenantCount = await base.factoryContract.tenantCounter();
				return tenantCount.toNumber();
			} catch (err) {
				throw err;
			}
		},
		getWhitelistedAddresses: async () => {
			try {
				const addresses = await base.proxyContract?.whitelistedAddresses();
				return addresses;
			} catch (error) {
				throw error;
			}
		},
		getAddressesClaimed: async () => {
			try {
				const addresses = await base.proxyContract?.addressesClaimed();
				return addresses;
			} catch (error) {
				throw error;
			}
		},
		isWhitelisted: async (account: string) => {
			try {
				const check = await base.proxyContract?.whitelistedAddresses(account);
				return check;
			} catch (error) {
				throw error;
			}
		},
		isWhitelistedMerkle: async (account: string) => {
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
		},
		hasClaimed: async (address: string) => {
			try {
				const check = await base.proxyContract?.addressesClaimed(address);
				return check;
			} catch (error) {
				throw error;
			}
		},
		active: async () => {
			try {
				const active = await base.proxyContract?.active();
				return active;
			} catch (error) {
				throw error;
			}
		},
		whitelist: async () => {
			try {
				const txn = await base.proxyContract?.getWhitelisted();
				return txn;
			} catch (error) {
				throw error;
			}
		},
		claimWhitelist: async (account: string) => {
			try {
				const addresses = await base.proxyContract?.whitelistedAddresses();
				const leafNodes = addresses.map((address: string) => keccak256(address));
				const tree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

				const txn = await base.proxyContract?.claimWhitelist(
					account,
					tree.getHexProof(keccak256(account))
				);
				return txn;
			} catch (error) {
				throw error;
			}
		},

		//Admin Functionality
		setMerkleRoot: async (root: string) => {
			try {
				const txn = await base.proxyContract?.updateMerkleRoot(root);
				return txn;
			} catch (error) {
				throw error;
			}
		},

		activateClaiming: async () => {
			try {
				const txn = await base.proxyContract?.activateWhitelistClaiming();
				return txn;
			} catch (error) {
				throw error;
			}
		},
		deactivateClaiming: async () => {
			try {
				const txn = await base.proxyContract?.deactivateWhitelistClaiming();
				return txn;
			} catch (error) {
				throw error;
			}
		},
		authorizeOperator: async (operator: string) => {
			try {
				const txn = await base.proxyContract?.authorizeOperator(operator);
				return txn;
			} catch (error) {
				throw error;
			}
		},
		revokeOperator: async (operator: string) => {
			try {
				const txn = await base.proxyContract?.revokeOperator(operator);
				return txn;
			} catch (error) {
				throw error;
			}
		},
	};
}
