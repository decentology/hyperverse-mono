import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider, initialize, Network } from '@decentology/hyperverse/react';
import { Ethereum } from '@decentology/hyperverse-ethereum/react';
import { ERC721 } from '@decentology/hyperverse-evm-erc721/react';
function MyApp({ Component, pageProps }: AppProps) {
	const hyperverse = initialize({
		blockchain: Ethereum,
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
