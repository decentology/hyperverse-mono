import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useFlow } from '@decentology/hyperverse-flow';
import { useToken } from '@decentology/hyperverse-flow-token';
import {
	Box,
	Item,
	TriggerContainer,
	Trigger,
	Parameters,
	Input,
	Content,
	Button,
} from './WriteComponents';

const Transfer = () => {
	const flow = useFlow();
	const token = useToken();
	const [receiver, setReceiver] = useState('');
	const [tokenId, setTokenId] = useState(0);
	const [done, setDone] = useState(false);

	const transfer = async () => {
		setDone(false);
		const tx = await token.transferToken(receiver, "10.0");
		setDone(true);
	};

	return (
		<Box>
			<h4>Transfer Tokens</h4>
			<p>Transfer Tokens to someone</p>
			<Input
				placeholder="Receiver"
				onChange={(e) => setReceiver(e.target.value)}
			/>
			<Input
				type="number"
				min="0"
				placeholder="TokenId to transfer"
				onChange={(e) => setTokenId(e.currentTarget.valueAsNumber)}
			/>
			<Button onClick={transfer}>
				{!flow.user?.addr ? 'Connet Wallet' : 'Transfer'}
			</Button>
			<p>{done ? "Done!" : null}</p>
		</Box>
	);
};

export default Transfer;
