import { useERC777 } from '../source';
import { useEffect, useState } from 'react';

export const GetBalanceOf = ({ ...props }: { account: string }) => {
	const erc777 = useERC777();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (erc777.getBalanceOf) {
			erc777.getBalanceOf(props.account).then(setData);
		}
	}, [erc777.getBalanceOf]);

	const balanceAvailable = () => {
		return data ? <p>{data} tokens</p> : <p>{erc777.error}</p>;
	};

	return <div className="body"> Balance of <b>{props.account}</b>: {balanceAvailable()}</div>;
};
