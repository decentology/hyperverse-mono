import { HyperverseConfig } from "@decentology/hyperverse";
import { getProvider } from "@decentology/hyperverse-evm";
import { constants, Contract, ethers } from "ethers";
import { getEnvironment } from "../environment";

export class ModuleLibrary {
	factoryContract: Contract;
	proxyContract: Contract | null = null;
	constructor(hyperverse: HyperverseConfig, providerOrSigner?: ethers.providers.Provider | ethers.Signer) {
		const { FactoryABI, factoryAddress, ContractABI } = getEnvironment(
			hyperverse.blockchain?.name!,
			hyperverse.network
		);
		if (!providerOrSigner) {
			providerOrSigner = getProvider(hyperverse.network);
		}
		this.factoryContract = new ethers.Contract(
			factoryAddress!,
			FactoryABI,
			providerOrSigner
		) as Contract;
		const tenantId = hyperverse.modules.find(x => x.bundle.ModuleName === "Tribes")?.tenantId;
		if (!tenantId) {
			throw new Error("Tenant ID is required");
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

	getTotalTenants = async () => {
		try {
			const tenantCount = await this.factoryContract.tenantCounter();

			return tenantCount.toNumber();
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

