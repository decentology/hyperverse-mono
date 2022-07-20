import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { initialize, Provider } from '@decentology/hyperverse/react';
import { Network } from '@decentology/hyperverse/react';
import { Ethereum, darkTheme } from '@decentology/hyperverse-ethereum/react';
import '@decentology/hyperverse-ethereum/styles.css';
import { Tribes } from '@decentology/hyperverse-evm-tribes/react';
import { RandomPick } from '@decentology/hyperverse-ethereum-randompick/react';
import InnerComponent from '../components/InnerComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@decentology/hyperverse-ethereum/styles.css';
import { QueryClient, QueryClientProvider } from 'react-query';

// Change your Tenant ID here.
const TENANT_ID = '0x62a7aa79a52591Ccc62B71729329A80a666fA50f';
const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
	const hyperverse = initialize({
		blockchain: Ethereum,
		network: Network.Testnet,
		modules: [
			{
				bundle: Tribes,
				tenantId: TENANT_ID,
			},
			{
				bundle: RandomPick,
				tenantId: TENANT_ID,
			},
		],
	});

	return (
		<QueryClientProvider client={queryClient}>
			<Provider initialState={hyperverse}>
				<Ethereum.Provider
					theme={darkTheme({
						accentColor: '#999',
					})}
				>
					<InnerComponent>
						<ToastContainer />
						<Component {...pageProps} />
					</InnerComponent>
				</Ethereum.Provider>
			</Provider>
		</QueryClientProvider>
	);
}

export default MyApp;
