import { useERC20 } from '../source';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

export const Allowance = ({ ...props }: { owner: string; spender: string }) => {
	const erc20 = useERC20();
	const [data, setData] = useState<BigNumber>();

	useEffect(() => {
		if (erc20.allowance) {
			erc20.allowance(props.owner, props.spender).then(setData);
		}
	}, [erc20.allowance]);

	const allowance = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(erc20.error)}</p>;
	};

	return <div className="body"> Allowance: {allowance()}</div>;
};
