import { initialize, Provider, networks } from '@decentology/hyperverse';
import { Ethereum } from '@decentology/hyperverse-ethereum';
import { QueryClientProvider, QueryClient } from 'react-query';
import {Module} from '../source/useToken' 
import { globalCss } from '../stitches.config';

const client = new QueryClient();

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
  blockchain: Ethereum,
  network:  networks.Testnet,
  modules: [],
});

function MyApp({ Component, pageProps }: AppProps) {
	globalStyles()
	return (
		<Provider initialState={hyperverse}>
			<QueryClientProvider client={client}>
				<Module.Provider>
				<Component {...pageProps} />
				</Module.Provider>
			</QueryClientProvider>
		</Provider>
	);
}

export default MyApp;
