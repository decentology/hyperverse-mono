import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { initialize, Provider } from '@decentology/hyperverse/react';
import { Network } from '@decentology/hyperverse/react';
import { Metis } from '@decentology/hyperverse-metis/react';
import { Tribes } from '@decentology/hyperverse-evm-tribes/react';
import InnerComponent from '../components/InnerComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@decentology/hyperverse-metis/styles.css';
function MyApp({ Component, pageProps }: AppProps) {
	const hyperverse = initialize({
		blockchain: Metis,
		network: Network.Testnet,
		modules: [
			{
				bundle: Tribes,
				tenantId: '0x62a7aa79a52591Ccc62B71729329A80a666fA50f',
			},
		],
	});
	return (
		<Provider initialState={hyperverse}>
			<InnerComponent>
				<ToastContainer />
				<Component {...pageProps} />
			</InnerComponent>
		</Provider>
	);
}

export default MyApp;
