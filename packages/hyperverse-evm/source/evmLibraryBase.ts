import { HyperverseConfig, NetworkConfig } from '@decentology/hyperverse';
import { Contract, ContractInterface, ethers } from 'ethers';

export const getProvider = (network: NetworkConfig) => {
	return new ethers.providers.JsonRpcProvider(network.networkUrl, {
		chainId: network.chainId!,
		name: network.name!,
	});
};

export async function EvmLibraryBase(
	moduleName: string,
	hyperverse: HyperverseConfig,
	factoryAddress: string,
	factoryABI: ContractInterface,
	contractABI: ContractInterface,
	providerOrSigner: ethers.providers.Provider | ethers.Signer
) {
	let error: Error | string | null = null;
	let signer: ethers.Signer | undefined;
	if (providerOrSigner instanceof ethers.providers.Web3Provider) {
		signer = providerOrSigner.getSigner();
	}

	let factoryContract = new ethers.Contract(
		factoryAddress!,
		factoryABI,
		providerOrSigner
	) as Contract;

	const tenantId = hyperverse.modules.find((x) => x.bundle.ModuleName === moduleName)?.tenantId;
	if (!tenantId) {
		throw new Error('Tenant ID is required');
	}
	
	const setProvider = (provider: ethers.providers.Provider) => {
		factoryContract = new ethers.Contract(factoryAddress!, factoryABI, provider) as Contract;
		console.log('setting provider');
		if (proxyContract) {
			proxyContract = new ethers.Contract(
				proxyContract.address,
				contractABI,
				provider
				) as Contract;
			}
		};

	let proxyAddress: string | null = null;
	let proxyContract: Contract | undefined;

	try {
		proxyAddress = await factoryContract.getProxy(tenantId);
	} catch (e) {
		const err = new Error(`Failed to get proxy address for tenant ${tenantId}`);
	 	error = err;
	}

	if (proxyAddress === ethers.constants.AddressZero) {
		throw new Error('Tenant ID is not registered');
	}

	if (proxyAddress != null) {
		proxyContract = new ethers.Contract(
			proxyAddress,
			contractABI,
			signer || providerOrSigner
		) as Contract;
	}

	const checkInstance = async (account: any) => {
		try {
			const instance = await factoryContract.instance(account);
			console.log('instance', instance);
			return instance;
		} catch (err) {
			factoryErrors(err);
			throw err;
		}
	};

	const getProxy = async (account: any) => {
		try {
			console.log('getting proxy');
			const instance = await factoryContract.getProxy(account);
			return instance;
		} catch (err) {
			console.log('error', err);
			if((err as any).errorName === 'InstanceDoesNotExist') {
				return;
			}
			factoryErrors(err);
			throw err;
		}
	};

	const createInstance = async ({
		account,
		...args
	}: {
		account: string;
		[key: string]: any;
	}) => {
		try {
			console.log('trying to create an instance', account);
			const createTxn = await factoryContract.createInstance(account, ...Object.values(args));
			return createTxn.wait();
		} catch (err) {
			factoryErrors(err);
			throw err;
		}
	};

	const factoryErrors = (err: any) => {
		console.error(err);
		if(err.errorName === 'InstanceDoesNotExist') {
			return;
		}
		
		if (!factoryContract?.signer) {
			throw new Error('Please connect your wallet!');
		}

		if (err.code === 4001) {
			throw new Error('You rejected the transaction!');
		}

		throw err;
	};
	const getTotalTenants = async () => {
		try {
			const tenantCount = await factoryContract.tenantCounter();

			return tenantCount.toNumber();
		} catch (err) {
			factoryErrors(err);
			throw err;
		}
	};

	return {
		error,
		setProvider,
		getProxy,
		checkInstance,
		createInstance,
		getTotalTenants,
		factoryContract,
		proxyContract,
		proxyAddress,
	};
}
