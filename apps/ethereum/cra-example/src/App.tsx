import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useRandomPick } from '@decentology/hyperverse-ethereum-randompick/react';

function App() {
	const { contract } = useRandomPick();
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					{contract?.address}
				</a>
			</header>
		</div>
	);
}

export default App;
