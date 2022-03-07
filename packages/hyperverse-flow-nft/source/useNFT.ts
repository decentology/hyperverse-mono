import { networks, useHyperverse } from '@decentology/hyperverse';
import { useEffect, useState } from 'react';
import { createContainer } from '@decentology/unstated-next';
import * as actions from './actions';
const fcl = require('@onflow/fcl');

function NFTState(initialState: { tenantId: string } = { tenantId: '' }) {
	const [isInitialized, setInitialized] = useState<boolean>(false);

	let { network } = useHyperverse();

	const tenantId = initialState.tenantId;
	const initialize = async () => {
		if (network === networks.Mainnet) {
			// TODO: Deploy to Flow Mainnet.
		} else if (network === networks.Testnet) {
			fcl.config().put('0xNFT', '0x3f55c5f48f39b076');
		}

		const NFTAddress = await fcl.config().get('0xNFT');
		if (typeof NFTAddress !== 'undefined') {
			setInitialized(true);
		} else {
			setInitialized(false);
		}
	};

	useEffect(() => {
		initialize();
	}, []);

	return {
		isInitialized,
		transferNFT: actions.transferNFT.bind(null, tenantId),
		setup: actions.setup,
		mintNFT: actions.mintNFT,
		getNFTIDs: actions.getNFTIDs.bind(null, tenantId),
		getNFTMetadata: actions.getNFTMetadata.bind(null, tenantId)
	};
}

export const FlowNFTContainer = createContainer(NFTState);
export const Provider = FlowNFTContainer.Provider;
export function useNFT() {
	return FlowNFTContainer.useContainer();
}
