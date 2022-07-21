import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initialize, Network, Provider } from '@decentology/hyperverse/react';
import { Ethereum } from '@decentology/hyperverse-ethereum/react';
import { RandomPick } from '@decentology/hyperverse-ethereum-randompick/react';
const hyperverse = initialize({
	blockchain: Ethereum,
	network: Network.Testnet,
	modules: [
		{
			bundle: RandomPick,
			tenantId: '0x62a7aa79a52591Ccc62B71729329A80a666fA50f',
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
