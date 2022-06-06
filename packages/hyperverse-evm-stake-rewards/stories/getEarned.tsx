import { useStakeRewards } from '../source';
import { useEffect, useState } from 'react';

export const GetEarned = ({ ...props }: { account: string }) => {
	const stakeRewards = useStakeRewards();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (stakeRewards.getEarned) {
			stakeRewards.getEarned(props.account).then(setData);
		}
	}, [stakeRewards.getEarned]);

	const hasEarnedTokens = () => {
		return data ? <p>{data}</p> : <p>Error.</p>;
	};

	return <div className="body"> Earned Tokens: {hasEarnedTokens()}</div>;
};
