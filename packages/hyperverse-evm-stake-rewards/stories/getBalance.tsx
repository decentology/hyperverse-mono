import { useStakeRewards } from '../source';
import { useEffect, useState } from 'react';

export const GetBalance = ({ ...props }) => {
	const stakeRewards = useStakeRewards();
	const [data, setData] = useState<number>();

	useEffect(() => {
		if (stakeRewards.getBalance) {
			stakeRewards.getBalance().then(setData);
		}
	}, [stakeRewards.getBalance]);

	const hasBalance = () => {
		return data ? <p>{data}</p> : <p>{JSON.stringify(stakeRewards.error)}</p>;
	};

	return <div className="body"> Balance: {hasBalance()}</div>;
};
