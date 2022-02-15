import { blockchains, makeHyperverseBlockchain } from '@decentology/hyperverse';
import { Provider, useFlow } from './useFlow';
export const Flow = makeHyperverseBlockchain({
	name: blockchains.Flow,
	Provider: Provider,
});
export { Provider, useFlow };
