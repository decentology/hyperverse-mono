export * from '@decentology/web3modal';
import { Provider, useEvm, Evm } from './useEVM';
import { Blockchain, makeHyperverseBlockchain } from '@decentology/hyperverse';
import { getProvider } from './library/evmLibrary';
export { BaseLibrary } from './library/evmLibrary';
export const Ethereum = makeHyperverseBlockchain({
	name: Blockchain.Ethereum,
	Provider: Provider,
});

export const Localhost = makeHyperverseBlockchain({
	name: Blockchain.Localhost,
	Provider: Provider,
});

export { Provider, useEvm, Evm, getProvider };
