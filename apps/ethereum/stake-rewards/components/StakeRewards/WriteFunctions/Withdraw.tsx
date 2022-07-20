import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum/react';
import { useStakeRewards } from '@decentology/hyperverse-evm-stake-rewards/react';
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
import { useMutation, useQuery } from 'react-query';

const Withdraw = () => {
	const { account } = useEthereum();
	const stakeRewards = useStakeRewards();

	const { data: instance } = useQuery('instance', () => stakeRewards.checkInstance!(account));

	const { mutate } = useMutation('claimReward', stakeRewards.withdraw);

	const [amount, setAmount] = useState(0);

	const withdraw = async () => {
		try {
			mutate(amount);
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
						<Trigger disabled={!account || !instance}>
							{!account
								? 'Connect Wallet'
								: !instance
								? 'Create an Instance'
								: 'Withdraw'}
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
								{!account ? 'Connet Wallet' : 'Withdraw'}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
			<Module>(Stake Rewards Module)</Module>
		</Box>
	);
};

export default Withdraw;
