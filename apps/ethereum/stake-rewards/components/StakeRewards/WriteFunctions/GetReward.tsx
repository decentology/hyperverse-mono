import { useEthereum } from '@decentology/hyperverse-ethereum/react';
import { useStakeRewards } from '@decentology/hyperverse-evm-stake-rewards/react';
import { Box, Button } from '../../ComponentStyles';
import { useMutation, useQuery } from 'react-query';

const GetReward = () => {
	const { account } = useEthereum();
	const stakeRewards = useStakeRewards();

	const { data: instance } = useQuery('instance', () => stakeRewards.checkInstance!(account));

	const { mutate } = useMutation('claimReward', stakeRewards.claimReward);

	return (
		<Box>
			<h4>Get Rewards</h4>
			<p>Withdraw your reward tokens</p>
			<Button disabled={!account || !instance} onClick={() => mutate()}>
				{!account
					? 'Connect Wallet'
					: !instance
					? 'Create an Instance'
					: 'Withdraw Rewards'}
			</Button>
		</Box>
	);
};

export default GetReward;
