import { HyperverseConfig } from '@decentology/hyperverse';
import { EvmLibraryBase, getProvider } from '@decentology/hyperverse-evm';
import { ethers } from 'ethers';
import { TransactionReceipt } from '@ethersproject/abstract-provider'
import { CancellablePromise } from 'real-cancellable-promise';
import { getEnvironment } from './environment';
import { MetaData, MetaDataFormatted } from './types';

export type TribesLibraryType = Awaited<ReturnType<typeof TribesLibraryInternal>>;
export function TribesLibrary(...args: Parameters<typeof TribesLibraryInternal>): CancellablePromise<TribesLibraryType> {
	return new CancellablePromise(TribesLibraryInternal(...args), () => { });
}

export async function TribesLibraryInternal(
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
		'Tribes',
		hyperverse,
		factoryAddress!,
		FactoryABI,
		ContractABI,
		providerOrSigner
	);

	const formatTribeResultFromTribeId = async (tribeId: number) => {
		try {
			const link = await base.proxyContract?.getTribeData(tribeId);
			const resp = await fetch(hyperverse!.storage!.getLink(link));
			if (resp.ok) {
				const json = await resp.json()
				json.id = tribeId;
				json.imageUrl = hyperverse!.storage!.getLink(json.image);
				return json as MetaDataFormatted;
			}
			throw new Error("Unable to format tribes document")
		} catch (error) {
			throw new Error("Unable to format tribes document")
		}
	};

	const getTribeId = async (account: string) => {
		try {
			const id = await base.proxyContract?.getUserTribe(account);
			return id.toNumber() as number;
		} catch (err) {
			if (err instanceof Error) {
				if (err.message.includes('This member is not in a Tribe!')) {
					return null;
				}
			}
		};
	};

	const getTribeByAccount = async (account: string) => {
		const tribeId = await getTribeId(account);
		return await getTribe(tribeId!);
	}

	const getTribe = async (id: number) => {
		try {
			await base.proxyContract?.getTribeData(id);
			return formatTribeResultFromTribeId(id);
		} catch (err) {
			throw err;
		}
	};

	const leaveTribe = async () => {
		try {
			const leaveTxn = await base.proxyContract?.leaveTribe();
			await leaveTxn.wait();
			return leaveTxn.hash as string;
		} catch (err) {
			throw err;
		}
	};

	const getAllTribes = async () => {
		try {
			const tribeCount = await base.proxyContract?.tribeCounter();
			const tribes: MetaDataFormatted[] = [];
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
	};

	const getTribeMembers = async (tribeId: number) => {
		try {
			const events = await base.proxyContract?.queryFilter(
				base.proxyContract?.filters.JoinedTribe(),
				0
			);
			const members = events
				?.map(e => {
					if (e.args) {
						return {
							tribeId: e.args[0].toNumber(),
							account: e.args[1]
						};
					}
				})
				.filter(e => e?.tribeId === tribeId);
			return members;
		} catch (err) {
			throw err;
		}
	};

	const joinTribe = async (id: number) => {
		try {
			const joinTxn = await base.proxyContract?.joinTribe(id);
			return joinTxn.wait() as TransactionReceipt;
		} catch (err) {
			throw err;
		}
	};


	const addTribe = async ({ metadata, image }: { metadata: Omit<MetaData, 'image'>, image: File }) => {
		try {
			const imageLink = await hyperverse.storage?.uploadFile(image);
			const fullMetaData: MetaData = {
				...metadata,
				image: imageLink!
			};
			const metadataFile = new File([JSON.stringify(fullMetaData)], 'metadata.json');
			const metadataFileLink = await hyperverse!.storage!.uploadFile(
				metadataFile
			);
			console.log(base.proxyContract);
			const addTxn = await base.proxyContract?.addNewTribe(metadataFileLink);
			return addTxn.wait() as TransactionReceipt;
		} catch (err) {
			throw err;
		}
	};

	return {
		...base,
		// getTribeId: depsReady(getTribeId),
		getTribeId,
		getTribeByAccount,
		getTribe,
		leaveTribe,
		getAllTribes,
		getTribeMembers,
		joinTribe,
		addTribe,
	};
}

