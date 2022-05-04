import { SkynetStorageLibrary } from '@decentology/hyperverse-storage-skynet';
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
		storageOptions?.name === Storage.Skynet
	) {
		return new SkynetStorageLibrary(
			storageOptions?.options?.clientUrl
				? { clientUrl: storageOptions.options.clientUrl }
				: undefined
		);
	}
	return undefined;
}

export default initialize;
