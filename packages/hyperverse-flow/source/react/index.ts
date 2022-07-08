import { Blockchain, makeHyperverseBlockchain } from '@decentology/hyperverse';
import { Provider, useFlow } from './useFlow';
export const Flow = makeHyperverseBlockchain({
	name: Blockchain.Flow,
	Provider: Provider,
});

export const Localhost = makeHyperverseBlockchain({
	name: Blockchain.Localhost,
	Provider: Provider
});

export { Provider, useFlow };
