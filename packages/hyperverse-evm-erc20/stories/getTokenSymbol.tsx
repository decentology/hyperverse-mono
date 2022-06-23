import { useERC20 } from '../source';
import { useEffect, useState } from 'react';

export const GetTokenSymbol = ({ ...props }) => {
	const erc20 = useERC20();
	const [data, setData] = useState<string>();

	useEffect(() => {
		if (erc20.getTokenSymbol) {
			erc20.getTokenSymbol().then(setData);
		}
	}, [erc20.getTokenSymbol]);

	const hasTokenSymbol = () => {
		return data ? <p>{data}</p> : <p>{JSON.stringify(erc20.error)}</p>;
	};

	return <div className="body"> Token Symbol: {hasTokenSymbol()}</div>;
};
