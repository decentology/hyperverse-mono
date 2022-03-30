import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { initialize, Provider } from '@decentology/hyperverse';
import { Network } from '@decentology/hyperverse';
import { Metis } from '@decentology/hyperverse-metis';
import * as Tribes from '@decentology/hyperverse-evm-tribes';
import InnerComponent from '../components/InnerComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function MyApp({ Component, pageProps }: AppProps) {
	const hyperverse = initialize({
		blockchain: Metis,
		network: Network.Testnet,
		storage: {
			options: { clientUrl: 'https://fileportal.org' }, // Updated to fileportal due to SSL error issues with SiaSky.net
		},
		modules: [
			{
				bundle: Tribes,
				tenantId: '0x8f8B8BE836fbe857c65E892dBb261F249f9b0adb',
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
