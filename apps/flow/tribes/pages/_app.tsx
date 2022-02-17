import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { initialize, networks, Provider } from '@decentology/hyperverse';
import { Flow } from '@decentology/hyperverse-flow';
import * as Tribes from '@decentology/hyperverse-flow-tribes';
import * as RandomPick from '@decentology/hyperverse-flow-randompick';
import { TENANT_ADDRESS } from './shared';

function MyApp({ Component, pageProps }: AppProps) {
	const hyperverse = initialize({
		blockchain: Flow,
		network: networks.Testnet,
		modules: [
			{ bundle: Tribes, tenantId: TENANT_ADDRESS },
			{ bundle: RandomPick, tenantId: null }
		],
	});
	return (
		<Provider initialState={hyperverse}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
