import { useStakeRewards } from '../source';
import { useEffect, useState } from 'react';

export const GetBalance = ({ ...props }) => {
	const stakeRewards = useStakeRewards();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (stakeRewards.getBalance) {
			stakeRewards.getBalance().then(setData);
		}
	}, [stakeRewards.getBalance]);

	const hasBalance = () => {
		return data ? <p>{data}</p> : <p>Error.</p>;
	};

	return <div className="balance"> Balance: {hasBalance()}</div>;
};
