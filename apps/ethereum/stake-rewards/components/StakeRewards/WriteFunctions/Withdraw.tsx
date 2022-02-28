import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useStakeRewards } from '@decentology/hyperverse-ethereum-stake-rewards';
import {
	Box,
	Item,
	TriggerContainer,
	Trigger,
	Parameters,
	Input,
	Content,
	Button,
} from '../../ComponentStyles';

const Withdraw = () => {
	const { address } = useEthereum();
	const { WithdrawTokens } = useStakeRewards();
	const { mutate } = WithdrawTokens();
	const [amount, setAmount] = useState(0);

	const withdraw = async () => {
		try {
			const instanceData = {
        amount: amount,
			};

			mutate(instanceData);
		} catch (error) {
			throw error;
		}
	};

	return (
		<Box>
			<h4>Withdraw</h4>
			<p>Withdraw your staked tokens</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!address}>
							{!address ? 'Connect Wallet' : 'Withdraw'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
							<Input
								type="number"
								min="0"
								placeholder="Amount"
								onChange={(e) => setAmount(e.currentTarget.valueAsNumber)}
							/>
							<Button onClick={withdraw}>
								{!address ? 'Connet Wallet' : 'Withdraw'}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
		</Box>
	);
};

export default Withdraw;
