import { useERC20 } from '../source';
import { useEffect, useState } from 'react';

export const GetTokenName = ({ ...props }) => {
	const erc20 = useERC20();
	const [data, setData] = useState<string>();

	useEffect(() => {
		if (erc20.getTokenName) {
			erc20.getTokenName().then(setData);
		}
	}, [erc20.getTokenName]);

	const hasTokenName = () => {
		return data ? <p>{data}</p> : <p>{JSON.stringify(erc20.error)}</p>;
	};

	return <div className="body"> Token Name: {hasTokenName()}</div>;
};
