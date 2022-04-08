import { SkynetStorageLibrary } from '@decentology/hyperverse-storage-skynet';
import { Hyperverse, HyperverseConfig } from './types';

function initialize(options: Hyperverse) {
	const network = options.blockchain!.getNetwork!((typeof options.network === 'string' ? options.network : options.network.type));
	const hyperverseConfig: HyperverseConfig = {
		...options,
		storage: new SkynetStorageLibrary({
			clientUrl: typeof options.storage !== 'string' ? options.storage?.options.clientUrl : undefined
		}),
		network
	};
	return hyperverseConfig;
}

export default initialize;
