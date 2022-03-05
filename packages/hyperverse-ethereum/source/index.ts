export * from '@decentology/web3modal';
import { useEthereum } from './useEthereum';
import Provider from './Provider'
import { Blockchain, makeHyperverseBlockchain } from '@decentology/hyperverse';

export const Ethereum = makeHyperverseBlockchain({
	name: Blockchain.Ethereum,
	Provider: Provider,
});

export { Provider, useEthereum };
