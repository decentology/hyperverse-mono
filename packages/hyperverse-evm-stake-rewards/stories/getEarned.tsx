import { useStakeRewards } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const GetEarned = ({ ...props }: { account: string }) => {
	const stakeRewards = useStakeRewards();
	const { address } = useEvm();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (stakeRewards.getEarned) {
			stakeRewards.getEarned(props.account).then(setData);
		}
	}, [stakeRewards.getEarned]);

	const hasEarnedTokens = () => {
		return data ? <p>{data}</p> : <p>Error.</p>;
	};

	return <div className="earnedTokens"> Earned Tokens: {hasEarnedTokens()}</div>;
};
