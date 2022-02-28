export * from '@decentology/web3modal';
import { Provider, useEvm, Evm } from './useEVM';
import { blockchains, makeHyperverseBlockchain } from '@decentology/hyperverse';

export const Ethereum = makeHyperverseBlockchain({
	name: blockchains.Ethereum,
	Provider: Provider,
});

export { Provider, useEvm, Evm };
