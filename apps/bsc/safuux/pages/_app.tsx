import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { initialize, Provider, Network } from '@decentology/hyperverse/react';
import { BSC, Localhost } from '@decentology/hyperverse-bsc/react';
import { Safuu } from '@decentology/hyperverse-bsc-safuu/react';
import '@decentology/hyperverse-bsc/styles.css';
function MyApp({ Component, pageProps }: AppProps) {
	const hyperverse = initialize({
		blockchain: Localhost,
		network: Network.Testnet,
		modules: [{ bundle: Safuu, tenantId: '0x8f8B8BE836fbe857c65E892dBb261F249f9b0adb' }],
	});
	return (
		<Provider initialState={hyperverse}>
			<Component {...pageProps} />;
		</Provider>
	);
}

export default MyApp;
