import { IpfsStorageLibrary } from '@decentology/hyperverse-storage-ipfs';
import { NetworkConfig } from './constants/networks';
import Storage from './constants/storage';
import { Hyperverse, HyperverseConfig, StorageOptions } from './types';

function initialize(options: Hyperverse) {
	let network: NetworkConfig;
	if (typeof options.network === 'string') {
		if (options.blockchain?.getNetwork) {
			network = options.blockchain.getNetwork(options.network);
		} else {
			network = { type: options.network };
		}
	} else {
		network = options.network;
	}
	const hyperverseConfig: HyperverseConfig = {
		...options,
		storage: setupStorage(options.storage),
		network,
	};
	return hyperverseConfig;
}

function setupStorage(options: Storage | StorageOptions) {
	const storageOptions: StorageOptions =
		typeof options === 'string' ? { name: options } : options;
	if (
		storageOptions === null ||
		storageOptions?.name === undefined ||
		storageOptions?.name === Storage.Ipfs
	) {
		return IpfsStorageLibrary(
			storageOptions?.options?.clientUrl ? { ...storageOptions.options } : undefined
		);
	}
	return undefined;
}

export default initialize;
