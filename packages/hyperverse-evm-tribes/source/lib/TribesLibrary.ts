import { HyperverseConfig } from '@decentology/hyperverse';
import { getProvider, } from '@decentology/hyperverse-evm';
import { SkynetStorageLibrary } from '@decentology/hyperverse-storage-skynet';
import { constants, Contract, ethers } from 'ethers';
import { getEnvironment } from '../environment';
import { MetaData } from '../types';

export class TribesLibrary {
	factoryContract: Contract;
	proxyContract: Contract | null = null;
	storage: SkynetStorageLibrary;
	constructor(hyperverse: HyperverseConfig, providerOrSigner?: ethers.providers.Provider | ethers.Signer) {
		this.storage = hyperverse.storage!;
		const { FactoryABI, factoryAddress, ContractABI } = getEnvironment(hyperverse.blockchain?.name!, hyperverse.network);
		if (!providerOrSigner) {
			providerOrSigner = getProvider(hyperverse.network);
		}
		this.factoryContract = new ethers.Contract(
			factoryAddress!,
			FactoryABI,
			providerOrSigner
		) as Contract;
		const tenantId = hyperverse.modules.find(x => x.bundle.ModuleName === 'Tribes')?.tenantId
		if (!tenantId) {
			throw new Error("Tenant ID is required")
		}
		this.setupProxy(tenantId, ContractABI, providerOrSigner);

	}

	async setupProxy(tenantId: string, ContractABI: any, providerOrSigner: ethers.providers.Provider | ethers.Signer) {
		let proxyAddress;
		try {
			proxyAddress = await this.factoryContract.getProxy(tenantId);
		} catch (error) {
			console.log('Failure!', error);
			throw new Error(`Failed to get proxy address for tenant ${tenantId}`);
		}
		if (proxyAddress == constants.AddressZero) {
			return;
		}
		this.proxyContract = new ethers.Contract(proxyAddress, ContractABI, providerOrSigner) as Contract;
	}

	checkInstance = async (account: any) => {
		try {
			const instance = await this.factoryContract.instance(account);
			return instance;
		} catch (err) {
			this.factoryErrors(err);
			throw err;
		}
	};

	createInstance = async (account: string) => {
		try {
			const createTxn = await this.factoryContract.createInstance(account);
			return createTxn.wait();
		} catch (err) {
			this.factoryErrors(err);
			throw err;
		}
	};
	getTribeId = async (account: string) => {
		try {
			const id = await this.proxyContract?.getUserTribe(account);
			return id.toNumber();
		} catch (err) {
			if (err instanceof Error) {
				if (err.message.includes('This member is not in a Tribe!')) {
					return null;
				}
			}
		}
	};

	getTribe = async (id: number) => {
		try {
			await this.proxyContract?.getTribeData(id);
			return this.formatTribeResultFromTribeId(id);
		} catch (err) {
			throw err;
		}
	};

	leaveTribe = async () => {
		try {
			const leaveTxn = await this.proxyContract?.leaveTribe();
			await leaveTxn.wait();
			return leaveTxn.hash;
		} catch (err) {
			throw err;
		}
	};

	getAllTribes = async () => {
		try {
			const tribeCount = await this.proxyContract?.tribeCounter();
			console.log('Got here?', tribeCount)
			const tribes = [];
			for (let tribeId = 1; tribeId <= tribeCount.toNumber(); ++tribeId) {
				const json = await this.formatTribeResultFromTribeId(tribeId);
				tribes.push(json);
			}

			return tribes;
		} catch (err) {
			throw err;
		}
	};

	getTribeMembers = async (tribeId: number) => {
		try {
			const events = await this.proxyContract?.queryFilter(
				this.proxyContract?.filters.JoinedTribe(),
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
	};

	joinTribe = async (id: number) => {
		debugger;
		try {
			const joinTxn = await this.proxyContract?.joinTribe(id);
			return joinTxn.wait();
		} catch (err) {
			throw err;
		}
	};

	getTotalTenants = async () => {
		try {
			const tenantCount = await this.factoryContract.tenantCounter();

			return tenantCount.toNumber();
		} catch (err) {
			this.factoryErrors(err);
			throw err;
		}
	};

	addTribe = async (metadata: Omit<MetaData, 'image'>, image: File) => {
		try {
			const { skylink: imageLink } = await this.storage.uploadFile(image);
			const fullMetaData: MetaData = {
				...metadata,
				image: imageLink,
			};
			const metadataFile = new File([JSON.stringify(fullMetaData)], 'metadata.json');
			const { skylink: metadataFileLink } = await this.storage.uploadFile(metadataFile);

			const addTxn = await this.proxyContract?.addNewTribe(metadataFileLink);
			return addTxn.wait();
		} catch (err) {
			throw err;
		}
	};

	useTribeEvents = (eventName: string, callback: any) => {
		// return useEvent(eventName, useCallback(callback, [proxyContract]), proxyContract);
	};

	private factoryErrors = (err: any) => {
		if (!this.factoryContract?.signer) {
			throw new Error('Please connect your wallet!');
		}

		if (err.code === 4001) {
			throw new Error('You rejected the transaction!');
		}

		throw err;
	};
	private formatTribeResultFromTribeId = async (tribeId: number) => {
		const txn = await this.proxyContract?.getTribeData(tribeId);
		const link = txn.replace('sia:', '');
		const json = JSON.parse(
			// eslint-disable-next-line no-await-in-loop
			await (await fetch(`${this.storage.clientUrl}/${link}`)).text()
		);

		json.id = tribeId;
		json.imageUrl = `${this.storage.clientUrl}/${json.image.replace('sia:', '')}`;
		return json;
	};
}
