import { useState } from 'react';
import { useFlow } from '@decentology/hyperverse-flow';
import { useToken } from '@decentology/hyperverse-flow-token';
import {
	Box,
	Input,
	Button,
} from './WriteComponents';

const MintNFT = () => {
	const flow = useFlow();
	const token = useToken();
	const [receiver, setReceiver] = useState('');
	const [amount, setAmount] = useState('');
	const [done, setDone] = useState(false);

	const mintAnNFT = async () => {
		setDone(false);
		const tx = await token.mintToken(receiver, parseInt(amount) + '.00');
		setDone(true);
	};

	return (
		<Box>
			<h4>Mint Token</h4>
			<p>Mint Token to someone</p>
			<Input
				placeholder="Receiver"
				onChange={(e) => setReceiver(e.target.value)}
			/>
			<Input
				placeholder="10.0"
				onChange={(e) => setAmount(e.target.value)}
			/>
			<Button onClick={mintAnNFT}>
				{!flow.user?.addr ? 'Connet Wallet' : 'Mint'}
			</Button>
			<p>{done ? "Done!" : null}</p>
		</Box>
	);
};

export default MintNFT;
