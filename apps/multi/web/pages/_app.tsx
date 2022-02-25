import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { HyperverseBlockchain, initialize, Provider } from '@decentology/hyperverse';
import { networks } from '@decentology/hyperverse';
import { Metis, Provider as MetisProvider } from '@decentology/hyperverse-metis';
import { Ethereum, Provider as EthereumProvider } from '@decentology/hyperverse-ethereum';
import { Flow, Provider as FlowProvider } from '@decentology/hyperverse-flow';
import { useState } from 'react';
import context from '../context/globalContext';
import { useLocalStorage } from 'react-use';
function MyApp({ Component, pageProps }: AppProps) {
	const [storageChain, setStorageChain] = useLocalStorage('selected-blockchain', 'ethereum');
	let initialStorageChain: HyperverseBlockchain<unknown> = Ethereum;
	switch (storageChain) {
		case 'ethereum':
			initialStorageChain = Ethereum;
			break;
		case 'metis':
			initialStorageChain = Metis;
			break;
		case 'flow':
			initialStorageChain = Flow;
	}
	const [blockchain, setBlockchain] =
		useState<HyperverseBlockchain<unknown>>(initialStorageChain);
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
				setStorageChain('ethereum');
				break;
			case 'metis':
				console.log('Setting  metis');
				setBlockchain(Metis);
				setStorageChain('metis');
				break;
			case 'flow':
				setBlockchain(Flow);
				setStorageChain('flow');
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
