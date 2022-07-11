import { Blockchain, makeHyperverseBlockchain } from '@decentology/hyperverse';
export const Flow = makeHyperverseBlockchain({
	name: Blockchain.Flow,
});

export const Localhost = makeHyperverseBlockchain({
	name: Blockchain.Localhost,
});

