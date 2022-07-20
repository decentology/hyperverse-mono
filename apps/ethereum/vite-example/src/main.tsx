import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider, initialize, Network } from '@decentology/hyperverse/react';
import { Ethereum } from '@decentology/hyperverse-ethereum/react';
import { RandomPick } from '@decentology/hyperverse-ethereum-randompick/react';

const hyperverse = initialize({
	blockchain: Ethereum,
	network: Network.Testnet,
	modules: [
		{
			bundle: RandomPick,
			tenantId: '0x8f8B8BE836fbe857c65E892dBb261F249f9b0adb',
		},
	],
});

ReactDOM.render(
	<React.StrictMode>
		<Provider initialState={hyperverse}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
