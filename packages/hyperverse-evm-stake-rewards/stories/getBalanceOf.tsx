import { useStakeRewards } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const GetBalanceOf = ({ ...props }: { account: string }) => {
	const stakeRewards = useStakeRewards();
	const { address } = useEvm();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (stakeRewards.getBalanceOf) {
			stakeRewards.getBalanceOf(props.account).then(setData);
		}
	}, [stakeRewards.getBalanceOf]);

	const hasBalance = () => {
		return data ? <p>{data}</p> : <p>Error!</p>;
	};

	return <div className="balanceOf"> Balance Of: {hasBalance()}</div>;
};
