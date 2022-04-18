import { HyperverseConfig, NetworkConfig } from '@decentology/hyperverse';
import { constants, Contract, ContractInterface, ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { Fragment } from 'ethers/lib/utils';

export const getProvider = (network: NetworkConfig) => {
	return new ethers.providers.JsonRpcProvider(network.networkUrl, {
		chainId: network.chainId!,
		name: network.name!,
	});
};

// Not ready for production use yet. Race condition on when factory and proxy need to be initialized
export async function BaseLibrary(

	hyperverse: HyperverseConfig,
	factoryAddress: string,
	factoryABI: ContractInterface,
	contractABI: ContractInterface,
	providerOrSigner: ethers.providers.Provider | ethers.Signer
) {

	let signer: ethers.Signer | undefined;
	console.log('What is the provider?', providerOrSigner);
	if (providerOrSigner instanceof Web3Provider) {
		signer = providerOrSigner.getSigner();
	}
	
	let factoryContract = new ethers.Contract(
		factoryAddress!,
		factoryABI,
		signer || providerOrSigner
	) as Contract;
	const tenantId = hyperverse.modules.find((x) => x.bundle.ModuleName === 'Tribes')?.tenantId;
	if (!tenantId) {
		throw new Error('Tenant ID is required');
	}

	const setProvider = (provider: ethers.providers.Provider) => {
		factoryContract = new ethers.Contract(
			factoryAddress!,
			factoryABI,
			signer || provider
		) as Contract;
		if (proxyContract) {
			proxyContract = new ethers.Contract(
				proxyContract.address,
				contractABI,
				signer || provider
			) as Contract;
		}
	}

	let proxyAddress: string
	let proxyContract: Contract | undefined;
	try {
		proxyAddress = await factoryContract.getProxy(tenantId);
	} catch (error) {
		console.log('Failure!', error);
		throw new Error(`Failed to get proxy address for tenant ${tenantId}`);
	}
	proxyContract = new ethers.Contract(
		proxyAddress,
		contractABI,
		signer || providerOrSigner
	) as Contract;



	const ready = true;

	const checkInstance = async (account: any) => {
		try {
			const instance = await factoryContract.instance(account);
			return instance;
		} catch (err) {
			factoryErrors(err);
			throw err;
		}
	};

	const createInstance = async (account: string) => {
		try {
			const createTxn = await factoryContract.createInstance(account);
			return createTxn.wait();
		} catch (err) {
			factoryErrors(err);
			throw err;
		}
	};
	const factoryErrors = (err: any) => {
		if (!factoryContract?.signer) {
			throw new Error('Please connect your wallet!');
		}

		if (err.code === 4001) {
			throw new Error('You rejected the transaction!');
		}

		throw err;
	};

	return {
		ready,
		setProvider,
		checkInstance,
		createInstance,
		factoryContract,
		proxyContract,
		proxyAddress

	}
}
