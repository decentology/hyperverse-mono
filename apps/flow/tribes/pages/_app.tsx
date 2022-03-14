import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { initialize, Network, Provider } from '@decentology/hyperverse';
import { Flow } from '@decentology/hyperverse-flow';
import * as Tribes from '@decentology/hyperverse-flow-tribes';
import { TENANT_ADDRESS } from './shared';

function MyApp({ Component, pageProps }: AppProps) {
	const hyperverse = initialize({
		blockchain: Flow,
		network: Network.Testnet,
		modules: [{ bundle: Tribes, tenantId: TENANT_ADDRESS }],
	});
	return (
		<Provider initialState={hyperverse}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
