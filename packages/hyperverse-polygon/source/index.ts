export * from '@decentology/web3modal';
import { Provider, usePolygon } from './usePolygon';
import { blockchains, makeHyperverseBlockchain } from '@decentology/hyperverse';

export const Polygon = makeHyperverseBlockchain({
	name: blockchains.Polygon,
	Provider: Provider,
});

export { Provider, usePolygon };
