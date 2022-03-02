import { useEffect, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useERC20 } from '@decentology/hyperverse-evm-erc20';
import { toast } from 'react-toastify';
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

const Transfer = () => {
	const { address } = useEthereum();
	const { Transfer } = useERC20();
	const { mutate, error } = Transfer();
	const [receiver, setReceiver] = useState('');
	const [amount, setAmount] = useState(0);

	const [err, setErr] = useState('');

	const createNewInstance = async () => {
		try {
			const instanceData = {
				to: receiver,
				value: amount,
			};

			mutate(instanceData);
		} catch (error) {
			console.log('e', error);
			throw error;

		}
	};

	useEffect(() => {
		if (error) {
			console.log(error);
			if (error instanceof Error) {
				toast.error(error.message, {
					position: toast.POSITION.BOTTOM_CENTER,
				});
			}
		}
	}, [err]);

	return (
		<Box>
			<h4>Transfer Tokens</h4>
			<p>Transfer your tokens to the provided address</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!address}>
							{!address ? 'Connect Wallet' : 'Transfer Tokens'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
							<Input
								placeholder="Receiver"
								onChange={(e) => setReceiver(e.target.value)}
							/>
							<Input
								type="number"
								min="0"
								placeholder="Amount to transfer"
								onChange={(e) => setAmount(e.currentTarget.valueAsNumber)}
							/>
							<Button onClick={createNewInstance}>
								{!address ? 'Connet Wallet' : 'Transfer'}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
		</Box>
	);
};

export default Transfer;
