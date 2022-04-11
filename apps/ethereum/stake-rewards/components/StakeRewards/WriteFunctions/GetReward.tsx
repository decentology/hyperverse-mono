import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { useStakeRewards } from '@decentology/hyperverse-ethereum-stake-rewards';
import {
	Box,
	Button,
} from '../../ComponentStyles';

const GetReward = () => {
	const { address } = useEthereum();
	const { CheckInstance, WithdrawReward } = useStakeRewards();
	const {data: instance} = CheckInstance();
	const { mutate } = WithdrawReward();


	return (
		<Box>
			<h4>Get Rewards</h4>
			<p>Withdraw your reward tokens</p>
			<Button disabled={!address || !instance} onClick={mutate}>
				{!address ? 'Connect Wallet' : !instance ? 'Create an Instance' : 'Withdraw Rewards'}
			</Button>
		</Box>
	);
};

export default GetReward;
