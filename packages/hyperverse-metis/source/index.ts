export * from '@decentology/web3modal';
import { Provider, useMetis } from './useMetis';
import { Blockchain, makeHyperverseBlockchain } from '@decentology/hyperverse';

export const Metis = makeHyperverseBlockchain({
	name: Blockchain.Metis,
	Provider: Provider,
});

export { Provider, useMetis };
