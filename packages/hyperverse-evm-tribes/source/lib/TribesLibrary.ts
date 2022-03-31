import { HyperverseBlockchain, NetworkConfig } from "@decentology/hyperverse";
import { getProvider } from "@decentology/hyperverse-evm";
import { constants, Contract, ethers } from "ethers";
import { getEnvironment } from "../environment";
import { MetaData, Storage } from "../types";

export class TribesLibrary {
	factoryContract: Contract;
	proxyContract: Contract | null = null;
	storage: Storage;
	constructor(blockchain: HyperverseBlockchain<unknown>, network: NetworkConfig, storage: Storage, tenantId: string) {
		const provider = getProvider(network.networkUrl!);
		const { FactoryABI, factoryAddress, ContractABI } = getEnvironment(blockchain, network);


		this.factoryContract = new ethers.Contract(factoryAddress!, FactoryABI, provider) as Contract;
		this.storage = storage;


		let proxyAddress;
		try {
			proxyAddress = this.factoryContract.getProxy(tenantId);
		} catch (error) {
			throw new Error(`Failed to get proxy address for tenant ${tenantId}`);
		}
		if (proxyAddress == constants.AddressZero) {
			return;
		}
		this.proxyContract = new ethers.Contract(proxyAddress, ContractABI, provider) as Contract;

	}

	checkInstance = async (account: any) => {
		try {
			const instance = await this.factoryContract.instance(account);
			return instance;
		} catch (err) {
			this.factoryErrors(err);
			throw err;
		}
	}
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

	leaveTribe = async () => {
		try {
			const leaveTxn = await this.proxyContract?.leaveTribe();
			await leaveTxn.wait();
			return leaveTxn.hash;
		} catch (err) {
			throw err;
		}
	}

	joinTribe = async (id: number) => {
		try {
			const joinTxn = await this.proxyContract?.joinTribe(id);
			return joinTxn.wait();
		} catch (err) {
			throw err;
		}
	}


	getTotalTenants = async () => {
		try {
			const tenantCount = await this.factoryContract.tenantCounter();

			return tenantCount.toNumber();
		} catch (err) {
			this.factoryErrors(err);
			throw err;
		}
	};

	addTribe =
		async (metadata: Omit<MetaData, 'image'>, image: File) => {
			try {
				const { skylink: imageLink } = await this.storage.uploadFile(image);
				const fullMetaData: MetaData = {
					...metadata,
					image: imageLink
				};
				const metadataFile = new File([JSON.stringify(fullMetaData)], 'metadata.json');
				const { skylink: metadataFileLink } = await this.storage.uploadFile(metadataFile);

				const addTxn = await this.proxyContract?.addNewTribe(
					metadataFileLink
				);
				return addTxn.wait();
			} catch (err) {
				throw err;
			}
		}

	private factoryErrors =
		(err: any) => {
			if (!this.factoryContract?.signer) {
				throw new Error('Please connect your wallet!');
			}

			if (err.code === 4001) {
				throw new Error('You rejected the transaction!');
			}

			throw err;
		};
}






