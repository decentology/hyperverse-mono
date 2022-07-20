import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum/react';
import { useERC777 } from '@decentology/hyperverse-evm-erc777/react';
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
import { useMutation } from 'react-query';

const Approve = () => {
	const { account } = useEthereum();

	const erc777 = useERC777();

	const { mutate } = useMutation('claimReward', erc777.approve);

	const [spender, setSpender] = useState('');
	const [amount, setAmount] = useState(0);

	const approve = async () => {
		try {
			mutate({
				spender: spender,
				amount: amount,
			});
		} catch (error) {
			throw error;
		}
	};

	return (
		<Box>
			<h4>Approve</h4>
			<p> Approve account to spend the given amount of token on your behalf</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!account}>
							{!account ? 'Connect Wallet' : 'Approve'}
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
								{!account ? 'Connet Wallet' : 'Approve'}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
			<Module>(Token Module)</Module>
		</Box>
	);
};

export default Approve;
