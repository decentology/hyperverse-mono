import { useERC777 } from '../source';
import { useEffect, useState } from 'react';

export const Allowance = ({ ...props }: { owner: string; spender: string }) => {
	const erc777 = useERC777();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (erc777.allowance) {
			erc777.allowance(props.owner, props.spender).then(setData);
		}
	}, [erc777.allowance]);

	const balanceAvailable = () => {
		return data ? <p>{JSON.stringify(data)} tokens</p> : <p>{erc777.error}</p>;
	};

	return <div className="body"> Allowance of <b>{props.spender}</b>: {balanceAvailable()}</div>;
};
