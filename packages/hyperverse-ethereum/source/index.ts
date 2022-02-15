export * from 'web3modal';
import { Provider, useEthereum } from './useEthereum';
import { blockchains, makeHyperverseBlockchain } from '@decentology/hyperverse';

export const Ethereum = makeHyperverseBlockchain({
	name: blockchains.Ethereum,
	Provider: Provider,
});

export { Provider, useEthereum };
