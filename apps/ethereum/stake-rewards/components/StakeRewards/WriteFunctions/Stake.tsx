import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useStakeRewards } from '@decentology/hyperverse-evm-stake-rewards';
import { Module } from '../../ComponentStyles';
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
import { useMutation, useQuery } from 'react-query';

const Stake = () => {
	const { account } = useEthereum();

	const stakeRewards = useStakeRewards();

	const { mutate } = useMutation('stake', stakeRewards.stake);

	const [amount, setAmount] = useState(0);

	const stake = async () => {
		try {
			mutate(amount);
		} catch (error) {
			throw error;
		}
	};

	return (
		<Box>
			<h4>Stake</h4>
			<p>Stake some tokens, make sure you have tokens from the initial staking token</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!account}>
							{!account
								? 'Connect Wallet'
								: 'Stake'}
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
							<Button onClick={stake}>{!account ? 'Connet Wallet' : 'Stake'}</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
			<Module>(Stake Rewards Module)</Module>
		</Box>
	);
};

export default Stake;
