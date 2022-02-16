export * from 'web3modal';
import { Provider, useMetis } from './useMetis';
import { blockchains, makeHyperverseBlockchain } from '@decentology/hyperverse';

export const Metis = makeHyperverseBlockchain({
	name: blockchains.Ethereum,
	Provider: Provider,
});

export { Provider, useMetis };
