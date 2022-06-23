import { useERC20 } from '../source';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

export const GetBalanceOf = ({ ...props }: { account: string }) => {
	const erc20 = useERC20();
	const [data, setData] = useState<BigNumber>();

	useEffect(() => {
		if (erc20.getBalanceOf) {
			erc20.getBalanceOf(props.account).then(setData);
		}
	}, [erc20.getBalanceOf]);

	const validAddress = () => {
		return data ? <p>{data}</p> : <p>{JSON.stringify(erc20.error)}</p>;
	};

	return (
		<div className="body">
			{' '}
			Balance of {props.account}: {validAddress()}
		</div>
	);
};
