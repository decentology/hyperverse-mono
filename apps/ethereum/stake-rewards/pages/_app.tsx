import { initialize, Provider, networks } from '@decentology/hyperverse';
import { Ethereum } from '@decentology/hyperverse-ethereum';
import * as Token from '@decentology/hyperverse-ethereum-token';
import * as StakeRewards from '@decentology/hyperverse-ethereum-stake-rewards';
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
	network: networks.Testnet,
	modules: [
		{
			bundle: Token,
			tenantId: '0xD847C7408c48b6b6720CCa75eB30a93acbF5163D',
		},
		{
			bundle: StakeRewards,
			tenantId: '0x399d1b0E067eA639b9Cf0E0D949ACC2f0eeF27F2',
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
