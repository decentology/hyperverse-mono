import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useStakeRewards } from '@decentology/hyperverse-evm-stake-rewards';
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

const CreateStakeInstance = () => {
	const { account } = useEthereum();
	const stakeRewards = useStakeRewards();

	const { data: instance } = useQuery('instance', () => stakeRewards.checkInstance!(account));

	const { mutate, isLoading } = useMutation('createInstance', stakeRewards.createInstance);

	const [stakingToken, setStakingToken] = useState('');
	const [rewardsToken, setRewardsToken] = useState('');
	const [rewardRate, setRewardRate] = useState(0);

	const createNewInstance = async () => {
		try {
			mutate({
				account: account!,
				stakingToken,
				rewardsToken,
				rewardRate,
			});
		} catch (error) {
			throw error;
		}
	};

	return (
		<Box id="createInstance">
			<h4>New Instance</h4>
			<p>Create your own instance of a stake rewards module </p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!account}>
							{!account
								? 'Connect Wallet'
								: instance
								? 'You already have an instance'
								: 'Create Instance'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
							<Input
								placeholder="Staking Token Address"
								onChange={(e) => setStakingToken(e.target.value)}
							/>
							<Input
								placeholder="Rewards Token Address"
								onChange={(e) => setRewardsToken(e.target.value)}
							/>
							<Input
								type="number"
								min="0"
								placeholder="Reward Rate"
								onChange={(e) => setRewardRate(e.currentTarget.valueAsNumber)}
							/>
							<Button onClick={createNewInstance}>
								{!account
									? 'Connet Wallet'
									: isLoading
									? 'txn loading ...'
									: 'Create Instance'}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
			<Module>(Stake Rewards Module)</Module>
		</Box>
	);
};

export default CreateStakeInstance;
