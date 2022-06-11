import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
// import { useERC20 } from '@decentology/hyperverse-evm-erc20';
import {
	Box,
	Item,
	TriggerContainer,
	Trigger,
	Parameters,
	Input,
	Content,
	Button,
	Module,
} from '../../ComponentStyles';
import { useERC777 } from '@decentology/hyperverse-evm-erc777';
import { useMutation } from 'react-query';

const TransferFrom = () => {
	const { account } = useEthereum();
	const erc777 = useERC777();

	const { mutate } = useMutation('createInstance', erc777.transferFrom);

	const [from, setFrom] = useState('');
	const [receiver, setReceiver] = useState('');
	const [amount, setAmount] = useState(0);

	const createNewInstance = async () => {
		try {
			mutate({
				from: from,
				to: receiver,
				amount: amount,
			});
		} catch (error) {
			throw error;
		}
	};

	return (
		<Box>
			<h4>Transfer From</h4>
			<p>Transfers tokens from one account to another</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!account}>
							{!account ? 'Connect Wallet' : 'Transfer From'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
							<Input placeholder="From" onChange={(e) => setFrom(e.target.value)} />
							<Input placeholder="To" onChange={(e) => setReceiver(e.target.value)} />
							<Input
								type="number"
								min="0"
								placeholder="Amount to transfer"
								onChange={(e) => setAmount(e.currentTarget.valueAsNumber)}
							/>
							<Button onClick={createNewInstance}>
								{!account ? 'Connet Wallet' : 'Transfer '}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
			<Module>(Token Module)</Module>
		</Box>
	);
};

export default TransferFrom;
