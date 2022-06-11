import { initialize, Provider, Network } from '@decentology/hyperverse';
import { Ethereum } from '@decentology/hyperverse-ethereum';
import * as ERC721 from '@decentology/hyperverse-evm-erc721';
import { globalCss } from '../stitches.config';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@decentology/hyperverse-ethereum/styles.css';
import type { AppProps } from 'next/app';
import { useLocalStorage } from 'react-use';
import { createContext } from 'react';

// const globalStyles = globalCss({
// 	'*': {
// 		margin: 0,
// 		padding: 0,
// 	},
// 	html: {
// 		fontSize: 14,
// 		fontFamily: 'Proxima Nova, sans-serif',
// 		letterSpacing: '0.9px',
// 	},
// 	body: {
// 		fontSize: '1rem',

// 		backgroundColor: '$blue500',
// 		color: '$gray100',
// 		maxWidth: '1200px',

//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
// 	},
// });

const globalStyles = globalCss({
	'*': {
		margin: 0,
		padding: 0,
	},
	html: {
		fontFamily: 'Proxima Nova, sans-serif',
		letterSpacing: '0.9px',
	},
	body: {
		backgroundColor: '$blue500',
		color: '$white100',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
	},
	main: {
		display: 'flex',
		flexDirection: 'column',
		margin: 'auto',
		fontSize: 16,
		padding: '0 24px',
		minHeight: 700,
		'@desktop': {
			padding: 0,
			width: '1100px',
		},
	},
	a: {
		cursor: 'pointer',
		textDecoration: 'none',

		'&:hover': {
			opacity: 0.8,
		},
	},
});
const queryClient = new QueryClient();
export const AppContext = createContext({
	tenantId: '',
	setTenantId: (value: string) => {},
});
function MyApp({ Component, pageProps }: AppProps) {
	const [tenantId, setTenantId, removeTenantId] = useLocalStorage(
		'hyperverse-evm-erc721-tennantId',
		'0x62a7aa79a52591Ccc62B71729329A80a666fA50f',
	);
	
	const hyperverse = initialize({
		blockchain: Ethereum,
		network: Network.Testnet,
		modules: [
			{
				bundle: ERC721,
				tenantId: tenantId!,
			},
		],
	});
	
	globalStyles();
	return (
		<QueryClientProvider client={queryClient}>
			<Provider initialState={hyperverse}>
				<ToastContainer />
				<AppContext.Provider
					value={{
						tenantId: tenantId!,
						setTenantId,
					}}
				>
					<Component {...pageProps} />
				</AppContext.Provider>
			</Provider>
		</QueryClientProvider>
	);
}

export default MyApp;
