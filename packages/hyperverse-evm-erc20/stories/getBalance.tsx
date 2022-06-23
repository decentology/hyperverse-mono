import { useERC20 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

export const GetBalance = ({ ...props }) => {
	const erc20 = useERC20();
	const [data, setData] = useState<BigNumber>();

	useEffect(() => {
		if (erc20.getBalance) {
			erc20.getBalance().then(setData);
		}
	}, [erc20.getBalance]);

	const balanceAvailable = () => {
		return data ? <p>{data}</p> : <p>{JSON.stringify(erc20.error)}</p>;
	};

	return <div className="body"> Balance: {balanceAvailable()}</div>;
};
