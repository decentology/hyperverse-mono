import { useState } from 'react';
import './App.css';
import '@decentology/hyperverse-ethereum/styles.css';
import { useEthereum } from '@decentology/hyperverse-ethereum/react';
import { useRandomPick } from '@decentology/hyperverse-ethereum-randompick/react';

function App() {
	const [count, setCount] = useState(0);
	const { Connect } = useEthereum();
	const { contract } = useRandomPick();
	return (
		<div className="App">
			<header className="App-header">
				<img
					src="https://drive.google.com/uc?export=view&id=1UFpBzZRnOBIZhIcaAWui1FIe9OSfJTKx"
					width={500}
					alt="logo"
				/>
				<p>Hello Vite + React!</p>
				<p>
					<button type="button" onClick={() => setCount((count) => count + 1)}>
						count is: {count}
					</button>
				</p>
				<p>
					Contract Address: <code>{contract?.address}</code>
				</p>
				<Connect />
			</header>
		</div>
	);
}

export default App;
