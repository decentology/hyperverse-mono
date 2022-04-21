import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { initialize, Network, Provider } from '@decentology/hyperverse';
import { Metis } from '@decentology/hyperverse-metis';
function MyApp({ Component, pageProps }: AppProps) {
	const hyperverse = initialize({
		blockchain: Metis,
		network: Network.Testnet,
		modules: [],
	});
	return (
		<Provider initialState={hyperverse}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
