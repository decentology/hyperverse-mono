import { initialize, Provider, Network } from '@decentology/hyperverse';
import { Flow } from '@decentology/hyperverse-flow';
import * as NFT from '@decentology/hyperverse-flow-nft';
import { globalCss } from '../stitches.config';

import type { AppProps } from 'next/app';

const globalStyles = globalCss({
	'*': {
		margin: 0,
		padding: 0,
	},
	html: {
		fontSize: 14,
		fontFamily: 'Proxima Nova, sans-serif',
		letterSpacing: '0.9px',
	},
	body: {
		fontSize: '1rem',
		margin: '30px auto',
		backgroundColor: '$blue500',
		color: '$gray100',
		maxWidth: '1200px',
	}
})

const hyperverse = initialize({
	blockchain: Flow,
	network: Network.Testnet,
	modules: [
		{
			bundle: NFT,
			tenantId: '0x6c0d53c676256e8c',
		}
	],
});

function MyApp({ Component, pageProps }: AppProps) {
	globalStyles()
	return (
		<Provider initialState={hyperverse}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
