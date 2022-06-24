import { useERC20 } from '../source';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

export const GetTotalSupply = ({ ...props }) => {
	const erc20 = useERC20();
	const [data, setData] = useState<BigNumber>();

	useEffect(() => {
		if (erc20.getTotalSuply) {
			erc20.getTotalSuply().then(setData);
		}
	}, [erc20.getTotalSuply]);

	const hasTokens = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(erc20.error)}</p>;
	};

	return <div className="body"> Total Supply: {hasTokens()}</div>;
};
