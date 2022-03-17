export * from '@decentology/web3modal';
import { useMetis } from './useMetis';
import Provider from './Provider';
import { Blockchain, makeHyperverseBlockchain } from '@decentology/hyperverse';

export const Metis = makeHyperverseBlockchain({
	name: Blockchain.Metis,
	Provider: Provider,
});

export { Provider, useMetis };
