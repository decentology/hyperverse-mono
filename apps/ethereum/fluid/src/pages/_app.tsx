import type { AppProps } from 'next/app';
import { initialize, Provider, networks } from '@decentology/hyperverse';
import { Ethereum } from '@decentology/hyperverse-ethereum';
import * as ERC721 from '@decentology/hyperverse-ethereum-fluid';
import { Provider as Web3UIProvider, NETWORKS } from '@web3-ui/core';

import '../styles/globals.css';

const hyperverse = initialize({
	blockchain: Ethereum,
	network: networks.Testnet,
	modules: [
		{
			bundle: ERC721,
			tenantId: '0x6D2764652aD25c3194617d904C7a5a065056ca8B',
		},
	],
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider initialState={hyperverse}>
			<Web3UIProvider network={NETWORKS.rinkeby}>
				<Component {...pageProps} />
			</Web3UIProvider>
		</Provider>
	);
}

export default MyApp;
