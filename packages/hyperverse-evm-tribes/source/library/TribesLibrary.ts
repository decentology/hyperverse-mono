import { HyperverseConfig } from '@decentology/hyperverse';
import { BaseLibrary, getProvider } from '@decentology/hyperverse-evm';
import { ethers } from 'ethers';
import { getEnvironment } from '../environment';
import { MetaData } from '../types';

export type TribesLibraryType = Awaited<ReturnType<typeof TribesLibrary>>;
export async function TribesLibrary(

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
	const base = await BaseLibrary(hyperverse, factoryAddress!, FactoryABI, ContractABI, providerOrSigner);

	const factoryErrors = (err: any) => {
		if (!base.factoryContract?.signer) {
			throw new Error('Please connect your wallet!');
		}

		if (err.code === 4001) {
			throw new Error('You rejected the transaction!');
		}

		throw err;
	};
	const formatTribeResultFromTribeId = async (tribeId: number) => {
		const txn = await base.proxyContract?.getTribeData(tribeId);
		const link = txn.replace('sia:', '');
		const json = JSON.parse(
			// eslint-disable-next-line no-await-in-loop
			await (await fetch(`${hyperverse!.storage!.clientUrl}/${link}`)).text()
		);
		json.id = tribeId;
		json.imageUrl = `${hyperverse!.storage!.clientUrl}/${json.image.replace('sia:', '')}`;
		return json;
	};


	return {
		...base,
		getTribeId: async (account: string) => {
			try {
				const id = await base.proxyContract?.getUserTribe(account);
				return id.toNumber();
			} catch (err) {
				if (err instanceof Error) {
					if (err.message.includes('This member is not in a Tribe!')) {
						return null;
					}
				}
			}
		},

		getTribe: async (id: number) => {
			try {
				await base.proxyContract?.getTribeData(id);
				return formatTribeResultFromTribeId(id);
			} catch (err) {
				throw err;
			}
		},

		leaveTribe: async () => {
			try {
				const leaveTxn = await base.proxyContract?.leaveTribe();
				await leaveTxn.wait();
				return leaveTxn.hash;
			} catch (err) {
				throw err;
			}
		},

		getAllTribes: async () => {
			try {
				const tribeCount = await base.proxyContract?.tribeCounter();
				const tribes = [];
				if (tribeCount) {
					for (let tribeId = 1; tribeId <= tribeCount.toNumber(); ++tribeId) {
						const json = await formatTribeResultFromTribeId(tribeId);
						tribes.push(json);
					}
				}
				return tribes;
			} catch (err) {
				throw err;
			}
		},

		getTribeMembers: async (tribeId: number) => {
			try {
				const events = await base.proxyContract?.queryFilter(
					base.proxyContract?.filters.JoinedTribe(),
					0
				);
				const members = events
					?.map((e) => {
						if (e.args) {
							return {
								tribeId: e.args[0].toNumber(),
								account: e.args[1],
							};
						}
					})
					.filter((e) => e?.tribeId === tribeId);
				return members;
			} catch (err) {
				throw err;
			}
		},

		joinTribe: async (id: number) => {
			debugger;
			try {
				const joinTxn = await base.proxyContract?.joinTribe(id);
				return joinTxn.wait();
			} catch (err) {
				throw err;
			}
		},

		getTotalTenants: async () => {
			try {
				const tenantCount = await base.factoryContract.tenantCounter();

				return tenantCount.toNumber();
			} catch (err) {
				factoryErrors(err);
				throw err;
			}
		},

		addTribe: async (metadata: Omit<MetaData, 'image'>, image: File) => {
			try {
				const { skylink: imageLink } = await hyperverse!.storage!.uploadFile(image);
				const fullMetaData: MetaData = {
					...metadata,
					image: imageLink,
				};
				const metadataFile = new File([JSON.stringify(fullMetaData)], 'metadata.json');
				const { skylink: metadataFileLink } = await hyperverse!.storage!.uploadFile(metadataFile);

				const addTxn = await base.proxyContract?.addNewTribe(metadataFileLink);
				return addTxn.wait();
			} catch (err) {
				throw err;
			}
		},

		useTribeEvents: (eventName: string, callback: any) => {
			// return useEvent(eventName, useCallback(callback, [proxyContract]), proxyContract);
		},
	}
}
