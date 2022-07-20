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
import { useQuery } from 'react-query';

const BalanceOf = () => {
	const { account } = useEthereum();
	const stakeRewards = useStakeRewards();
	const { data: instance } = useQuery(
		'instance',
		() => account && stakeRewards.checkInstance!(address)
	);

	const [address, setAddress] = useState(account);
	const { data, isLoading } = useQuery('balanceOf', () => stakeRewards.getBalanceOf!(account!),
	{
		enabled: instance,
	})

	const [hidden, setHidden] = useState(false);

	return (
		<Box>
			<h4>Balance Of</h4>
			<p>Get the balance of staking token of a provided address</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!address || !instance}>
						{!account
									? 'Connect Wallet'
									: !instance
									? 'You need an instance'
									: isLoading
									? 'fetching ...'
									: !hidden
									? 'Get Proxy'
									: data}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
							<Input
								placeholder="Account"
								onChange={(e) => setAddress(e.target.value)}
							/>

							<Button onClick={() => setHidden((p) => !p)}>
								{!address ? 'Connect Wallet' : !hidden ? 'Get Balance Of' : data}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
			<Module>(Stake Rewards Module)</Module>
		</Box>
	);
};

export default BalanceOf;
