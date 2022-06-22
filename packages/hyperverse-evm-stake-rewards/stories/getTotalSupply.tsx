import { useStakeRewards } from '../source';
import { useEffect, useState } from 'react';

export const GetTotalSupply = ({ ...props }) => {
	const stakeRewards = useStakeRewards();
	const [data, setData] = useState<number>();

	useEffect(() => {
		if (stakeRewards.getTotalSuply) {
			stakeRewards.getTotalSuply().then(setData);
		}
	}, [stakeRewards.getTotalSuply]);

	const hasTokenSupply = () => {
		return data ? <p>{data}</p> : <p>{JSON.stringify(stakeRewards.error)}</p>;
	};

	return <div className="body"> Total Supply: {hasTokenSupply()}</div>;
};
