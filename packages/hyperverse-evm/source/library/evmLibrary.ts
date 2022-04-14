import { NetworkConfig } from "@decentology/hyperverse"
import { constants, Contract, ethers } from "ethers"

export const getProvider = (network: NetworkConfig) => {
	return new ethers.providers.JsonRpcProvider(network.networkUrl, { chainId: network.chainId!, name: network.name! })
}

// Not ready for production use yet. Race condition on when factory and proxy need to be initialized
export class BaseLibrary {
	factoryContract: Contract;
	proxyContract: Contract | null = null;

	constructor(tenantId: string, factoryAddress: string, FactoryABI: string, ContractABI: any, providerOrSigner: ethers.providers.Provider | ethers.Signer) {
		this.factoryContract = new ethers.Contract(
			factoryAddress!,
			FactoryABI,
			providerOrSigner
		) as Contract;
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
	private factoryErrors = (err: any) => {
		if (!this.factoryContract?.signer) {
			throw new Error('Please connect your wallet!');
		}

		if (err.code === 4001) {
			throw new Error('You rejected the transaction!');
		}

		throw err;
	};
}
