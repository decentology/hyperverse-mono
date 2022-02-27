import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useToken } from '@decentology/hyperverse-ethereum-token';
import {
	Box,
	Item,
	TriggerContainer,
	Trigger,
	Parameters,
	Input,
	Content,
	Button,
} from '../ComponentStyles';

const TransferFrom = () => {
	const { address } = useEthereum();
	const { TransferFrom } = useToken();
	const { mutate } = TransferFrom();
  const [from, setFrom] = useState('');
	const [receiver, setReceiver] = useState('');
	const [amount, setAmount] = useState(0);

	const createNewInstance = async () => {
		try {
			const instanceData = {
        from: from,
				to: receiver,
				value: amount,
			};

			mutate(instanceData);
		} catch (error) {
			throw error;
		}
	};

	return (
		<Box>
			<h4>Transfer From</h4>
			<p>Transfers tokens from one address to another</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!address}>
							{!address ? 'Connect Wallet' : 'Transfer From'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
            <Input
								placeholder="From"
								onChange={(e) => setFrom(e.target.value)}
							/>
							<Input
								placeholder="To"
								onChange={(e) => setReceiver(e.target.value)}
							/>
							<Input
								type="number"
								min="0"
								placeholder="Amount to transfer"
								onChange={(e) => setAmount(e.currentTarget.valueAsNumber)}
							/>
							<Button onClick={createNewInstance}>
								{!address ? 'Connet Wallet' : 'Transfer '}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
		</Box>
	);
};

export default TransferFrom;
