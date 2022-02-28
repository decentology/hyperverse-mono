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
} from '../ComponentStyles';

const BalanceOf = () => {
	const { address } = useEthereum();
	const { BalanceOf } = useStakeRewards();
	const [account, setAccount] = useState(address);
	const { data } = BalanceOf(account!);
	const [hidden, setHidden] = useState(false);

	return (
		<Box>
			<h4>Balance Of</h4>
			<p>Get the balance of staking token of a provided address</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!address}>
							{!address ? 'Connect Wallet' : 'Get Balance Of'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
							<Input
								placeholder="Account"
								onChange={(e) => setAccount(e.target.value)}
							/>

							<Button onClick={() => setHidden((p) => !p)}>
								{!address ? 'Connect Wallet' : !hidden ? 'Get Balance Of' : data}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
		</Box>
	);
};

export default BalanceOf;
