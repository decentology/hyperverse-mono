import { IpfsStorageLibrary } from '@decentology/hyperverse-storage-ipfs';
import Storage from './constants/storage';
import { Hyperverse, HyperverseConfig, StorageOptions } from './types';

function initialize(options: Hyperverse) {
	const network = typeof options.network === "string" ? (options.blockchain!.getNetwork!(
		options.network
	)) : options.network;
	const hyperverseConfig: HyperverseConfig = {
		...options,
		storage: setupStorage(options.storage),
		network
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
			storageOptions?.options?.clientUrl
				? { ...storageOptions.options }
				: undefined
		);
	}
	return undefined;
}

export default initialize;
