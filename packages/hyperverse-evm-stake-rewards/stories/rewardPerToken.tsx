import { useStakeRewards } from '../source';
import { useEffect, useState } from 'react';

export const RewardPerToken = ({ ...props }) => {
	const stakeRewards = useStakeRewards();
	const [data, setData] = useState();

	useEffect(() => {
		if (stakeRewards.rewardPerToken) {
			stakeRewards.rewardPerToken().then(setData);
		}
	}, [stakeRewards.rewardPerToken]);

	const hasRewardToken = () => {
		return data ? <p>{data}</p> : <p>Error.</p>;
	};

	return <div className="rewardToken"> Reward per Token: {hasRewardToken()}</div>;
};
