import { useStakeRewards } from '../source';
import { useEffect, useState } from 'react';

export const GetRewardToken = ({ ...props }) => {
	const stakeRewards = useStakeRewards();
	const [data, setData] = useState<string>();

	useEffect(() => {
		if (stakeRewards.getRewardToken) {
			stakeRewards.getRewardToken().then(setData);
		}
	}, [stakeRewards.getRewardToken]);

	const hasRewardToken = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(stakeRewards.error)}</p>;
	};

	return <div className="body"> Reward Token: {hasRewardToken()}</div>;
};

