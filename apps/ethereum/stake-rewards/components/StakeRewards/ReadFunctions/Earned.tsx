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
import { useQuery } from 'react-query';

const Earned = () => {
	const { account } = useEthereum();
	const stakeRewards = useStakeRewards();

	const { data: instance } = useQuery(
		'instance',
		() => account && stakeRewards.checkInstance!(address)
	);

	const [address, setAddress] = useState(account);
	const { data } = useQuery('balanceOf', () => stakeRewards.getEarned!(address!));

	const [hidden, setHidden] = useState(false);

	return (
		<Box>
			<h4>Earned</h4>
			<p>Get the earned rewards of an address</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!account || !instance}>
							{!account
								? 'Connect Wallet'
								: !instance
								? 'Create an Instance'
								: 'Get Earned Rewards'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
							<Input
								placeholder="Account"
								onChange={(e) => setAddress(e.target.value)}
							/>

							<Button onClick={() => setHidden((p) => !p)}>
								{!address
									? 'Connect Wallet'
									: !hidden
									? 'Get Earned Rewards'
									: data}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
			<Module>(Stake Rewards Module)</Module>
		</Box>
	);
};

export default Earned;
