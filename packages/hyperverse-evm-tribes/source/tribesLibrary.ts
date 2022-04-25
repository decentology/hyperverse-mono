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

async function TribesLibraryInternal(
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
		hyperverse,
		factoryAddress!,
		FactoryABI,
		ContractABI,
		providerOrSigner
	);

	const formatTribeResultFromTribeId = async (tribeId: number) => {
		const txn = await base.proxyContract?.getTribeData(tribeId);
		const link = txn.replace('sia:', '');
		const json = JSON.parse(
			// eslint-disable-next-line no-await-in-loop
			await (await fetch(`${hyperverse!.storage!.clientUrl}/${link}`)).text()
		);
		json.id = tribeId;
		json.imageUrl = `${hyperverse!.storage!.clientUrl}/${json.image.replace('sia:', '')}`;
		return json as MetaDataFormatted;
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
			console.log(
				'joinTribe',
				base.proxyContract.signer,
				// @ts-ignore
				window['tribesLibrary'] === this
			);
			const joinTxn = await base.proxyContract?.joinTribe(id);
			return joinTxn.wait() as TransactionReceipt;
		} catch (err) {
			throw err;
		}
	};


	const addTribe = async ({ metadata, image }: { metadata: Omit<MetaData, 'image'>, image: File }) => {
		try {
			const { skylink: imageLink } = await hyperverse!.storage!.uploadFile(image);
			const fullMetaData: MetaData = {
				...metadata,
				image: imageLink
			};
			const metadataFile = new File([JSON.stringify(fullMetaData)], 'metadata.json');
			const { skylink: metadataFileLink } = await hyperverse!.storage!.uploadFile(
				metadataFile
			);

			const addTxn = await base.proxyContract?.addNewTribe(metadataFileLink);
			return addTxn.wait() as TransactionReceipt;
		} catch (err) {
			throw err;
		}
	};

	const useTribeEvents = (eventName: string, callback: any) => {
		// return useEvent(eventName, useCallback(callback, [proxyContract]), proxyContract);
	}

	return {
		...base,
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
