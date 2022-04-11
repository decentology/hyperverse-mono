import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useStakeRewards } from '@decentology/hyperverse-ethereum-stake-rewards';
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

const Stake = () => {
	const { address } = useEthereum();
	const { CheckInstance, StakeTokens } = useStakeRewards();
	const {data: instance} = CheckInstance();
	const { mutate } = StakeTokens();
	const [amount, setAmount] = useState(0);

	const stake = async () => {
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
			<h4>Stake</h4>
			<p>Stake some tokens, make sure you have tokens from the staking contract</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!address || !instance}>
							{!address ? 'Connect Wallet' : !instance ? 'Create an Instance'  : 'Stake'}
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
							<Button onClick={stake}>
								{!address ? 'Connet Wallet' : 'Stake'}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
			<Module>(Stake Rewards Module)</Module>
		</Box>
	);
};

export default Stake;
