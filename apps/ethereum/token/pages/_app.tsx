import { initialize, Provider, Network } from '@decentology/hyperverse';
import { Ethereum } from '@decentology/hyperverse-ethereum';
import * as Token from '@decentology/hyperverse-evm-erc20';
import { globalCss } from '../stitches.config';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
	},
});

const hyperverse = initialize({
	blockchain: Ethereum,
	network: Network.Testnet,
	modules: [
		{
			bundle: Token,
			tenantId: '0x62a7aa79a52591Ccc62B71729329A80a666fA50f',
		},
	],
});

function MyApp({ Component, pageProps }: AppProps) {
	globalStyles();
	return (
		<Provider initialState={hyperverse}>
			<ToastContainer />
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
