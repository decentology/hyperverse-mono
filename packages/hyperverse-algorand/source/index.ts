import { Provider } from './context/Provider';
import { Blockchain, makeHyperverseBlockchain } from '@decentology/hyperverse';
export { useAlgorand } from './useAlgorand';
export const Algorand = makeHyperverseBlockchain({
	name: Blockchain.Algorand,
	Provider: Provider
});

export { Address, Signature, Transactions } from './components';
