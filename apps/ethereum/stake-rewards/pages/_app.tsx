import { initialize, Provider, Network } from '@decentology/hyperverse/react';
import { Ethereum } from '@decentology/hyperverse-ethereum/react';
import { ERC777 } from '@decentology/hyperverse-evm-erc777/react';
import { StakeRewards } from '@decentology/hyperverse-evm-stake-rewards/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';

import { globalCss } from '../stitches.config';
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

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	const hyperverse = initialize({
		blockchain: Ethereum,
		network: Network.Testnet,
		modules: [
			{
				bundle: ERC777,
				tenantId: '0x62a7aa79a52591Ccc62B71729329A80a666fA50f',
			},
			{
				bundle: StakeRewards,
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
