import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useStakeRewards } from '@decentology/hyperverse-ethereum-stake-rewards';
import {
	Box,
	Button,
} from '../ComponentStyles';

const WithdrawReward = () => {
	const { address } = useEthereum();
	const { WithdrawReward } = useStakeRewards();
	const { mutate } = WithdrawReward();


	return (
		<Box>
			<h4>Get Rewards</h4>
			<p>Withdraw your reward tokens</p>
			<Button disabled={!address} onClick={mutate}>
				{!address ? 'Connect Wallet' : 'Withdraw Rewards'}
			</Button>
		</Box>
	);
};

export default WithdrawReward;
