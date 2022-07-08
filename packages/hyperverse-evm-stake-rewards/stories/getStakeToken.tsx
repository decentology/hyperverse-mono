import { useStakeRewards } from '../source';
import { useEffect, useState } from 'react';

export const GetStakeToken = ({ ...props }) => {
	const stakeRewards = useStakeRewards();
	const [data, setData] = useState<string>();

	useEffect(() => {
		if (stakeRewards.getStakeToken) {
			stakeRewards.getStakeToken().then(setData);
		}
	}, [stakeRewards.getStakeToken]);

	const hasStakeToken = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(stakeRewards.error)}</p>;
	};

	return <div className="body"> Stake Token: {hasStakeToken()}</div>;
};
