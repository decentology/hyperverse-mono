import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { HyperverseBlockchain, initialize, Provider } from '@decentology/hyperverse';
import { networks } from '@decentology/hyperverse';
import { Metis, Provider as MetisProvider } from '@decentology/hyperverse-metis';
import { Ethereum, Provider as EthereumProvider } from '@decentology/hyperverse-ethereum';
import { Flow, Provider as FlowProvider } from '@decentology/hyperverse-flow';
import { useState } from 'react';
import context from '../context/globalContext';
function MyApp({ Component, pageProps }: AppProps) {
	const [blockchain, setBlockchain] = useState<HyperverseBlockchain<unknown>>(Ethereum);
	const hyperverse = initialize({
		blockchain: blockchain,
		network: networks.Testnet,
		options: {
			disableProviderAutoInit: false,
		},
		modules: [],
	});

	const switchBlockchain = (name: 'ethereum' | 'metis' | 'flow') => {
		switch (name) {
			case 'ethereum':
				setBlockchain(Ethereum);
				break;
			case 'metis':
				console.log('Setting  metis');
				setBlockchain(Metis);
				break;
			case 'flow':
				setBlockchain(Flow);
				break;
		}
	};

	return (
		<context.Provider value={{ switchBlockchain }}>
			<Provider initialState={hyperverse}>
				<EthereumProvider>
					<MetisProvider>
						<FlowProvider>
							<Component {...pageProps} />
						</FlowProvider>
					</MetisProvider>
				</EthereumProvider>
			</Provider>
		</context.Provider>
	);
}

export default MyApp;
