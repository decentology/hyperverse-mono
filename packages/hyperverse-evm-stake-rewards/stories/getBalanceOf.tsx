import { useStakeRewards } from '../source';
import { useEffect, useState } from 'react';

export const GetBalanceOf = ({ ...props }: { account: string }) => {
	const stakeRewards = useStakeRewards();
	const [data, setData] = useState<number>();

	useEffect(() => {
		if (stakeRewards.getBalanceOf) {
			stakeRewards.getBalanceOf(props.account).then(setData);
		}
	}, [stakeRewards.getBalanceOf]);

	const hasBalance = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(stakeRewards.error)}</p>;
	};

	return (
		<div className="body">
			{' '}
			Balance of <b>{props.account}</b>: {hasBalance()}
		</div>
	);
};
