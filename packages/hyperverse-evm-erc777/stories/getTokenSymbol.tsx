import { useERC777 } from '../source';
import { useEffect, useState } from 'react';

export const GetTokenSymbol = ({ ...props }) => {
	const erc777 = useERC777();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (erc777.getTokenSymbol) {
			erc777.getTokenSymbol().then(setData);
		}
	}, [erc777.getTokenSymbol]);

	const tokenSymbol = () => {
		return data ? <p>{data}</p> : <p>{erc777.error}</p>;
	};

	return <div className="body"> Token Symbol: {tokenSymbol()}</div>;
};
