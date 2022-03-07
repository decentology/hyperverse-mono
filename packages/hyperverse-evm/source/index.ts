export * from '@decentology/web3modal';
import { Provider, useEvm, Evm } from './useEVM';
import { Blockchain, makeHyperverseBlockchain } from '@decentology/hyperverse';

export const Ethereum = makeHyperverseBlockchain({
	name: Blockchain.Ethereum,
	Provider: Provider
});

export { Provider, useEvm, Evm };
