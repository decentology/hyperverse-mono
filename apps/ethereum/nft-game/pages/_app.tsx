import { initialize, Provider, Network } from '@decentology/hyperverse/react';
import { Ethereum, Localhost } from '@decentology/hyperverse-ethereum/react';
import '@decentology/hyperverse-ethereum/styles.css';
import { NFTGame } from '@decentology/hyperverse-evm-nft-game/react';

import { globalCss } from '../stitches.config';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';

import type { AppProps } from 'next/app';

const globalStyles = globalCss({
	html: {
		overflowX: 'hidden',
	},

	body: {
		margin: 0,
		backgroundColor: '$black300',
	},

	'body, button': {
		fontFamily: '$body',
		color: '$grey100',
	},

	svg: { display: 'block' },

	'pre, code': { margin: 0, fontFamily: '$mono' },
	section: {
		paddingX: 16,
		'@laptop': {
			paddingX: 0,
			margin: '0 auto',
			minWidth: '1160px',
			maxWidth: '1300px',
		},
	},
});
const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
	const hyperverse = initialize({
		blockchain: Localhost,
		network: Network.Testnet,
		modules: [
			{
				bundle: NFTGame,
				//TO DO: Input the account you used to create your tenant here,
				tenantId: '0x62a7aa79a52591Ccc62B71729329A80a666fA50f',
			},
		],
	});

	globalStyles();
	return (
		<QueryClientProvider client={queryClient}>
			<Provider initialState={hyperverse}>
				<ToastContainer />
				<Component {...pageProps} />
			</Provider>
		</QueryClientProvider>
	);
}

export default MyApp;
