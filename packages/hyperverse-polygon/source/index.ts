import { Provider, usePolygon } from './usePolygon';
import { Blockchain, makeHyperverseBlockchain } from '@decentology/hyperverse';

export const Polygon = makeHyperverseBlockchain({
	name: Blockchain.Polygon,
	Provider: Provider,
});

export { Provider, usePolygon };
