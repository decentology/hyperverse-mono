import { initialize, Provider, Network } from '@decentology/hyperverse';
import { Ethereum } from '@decentology/hyperverse-ethereum';
import * as Token from '@decentology/hyperverse-evm-erc20';
import { globalCss } from '../../stitches.config';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const globalStyles = globalCss({
	'*': {
		margin: 0,
		padding: 0,

	},
	html: {
		fontSize: 14,
		fontFamily: '$mainFont',
		letterSpacing: '0.9px',
	},
	body: {
		fontSize: '1rem',
		margin: '100px auto',
		backgroundImage: 'url("images/bkg.png")',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundColor: '$black100',
		color: '$white100',
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
				bundle: Token,
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
