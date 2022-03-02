import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useERC20 } from '@decentology/hyperverse-evm-erc20';
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

const Approve = () => {
	const { address } = useEthereum();
	const { Approve } = useERC20();
	const { mutate } = Approve();
	const [spender, setSpender] = useState('');
	const [amount, setAmount] = useState(0);

	const approve = async () => {
		try {
			const instanceData = {
        spender: spender,
        amount: amount,
			};

			mutate(instanceData);
		} catch (error) {
			throw error;
		}
	};

	return (
		<Box>
			<h4>Approve</h4>
			<p> Approve address to spend the given amount of token on your behalf</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!address}>
							{!address ? 'Connect Wallet' : 'Approve'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
							<Input
								placeholder="Spender"
								onChange={(e) => setSpender(e.target.value)}
							/>
							<Input
								type="number"
								min="0"
								placeholder="Amount to transfer"
								onChange={(e) => setAmount(e.currentTarget.valueAsNumber)}
							/>
							<Button onClick={approve}>
								{!address ? 'Connet Wallet' : 'Approve'}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
		</Box>
	);
};

export default Approve;
