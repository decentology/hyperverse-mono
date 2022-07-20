import { initialize, Provider, Network } from '@decentology/hyperverse/react';
import { Ethereum } from '@decentology/hyperverse-ethereum/react';
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
		blockchain: Ethereum,
		// network: Network.Testnet,
		network: {
			type: Network.Testnet,
			networkUrl: 'http://localhost:8545',
			chainId: 31337,
		},
		modules: [
			{
				bundle: NFTGame,
				//TO DO: Input the account you used to create your tenant here,
				tenantId: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
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
