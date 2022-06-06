import { useERC777 } from '../source';
import { useEffect, useState } from 'react';

export const GetTokenName = ({ ...props }) => {
	const erc777 = useERC777();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (erc777.getTokenName) {
			erc777.getTokenName().then(setData);
		}
	}, [erc777.getTokenName]);

	const tokenName = () => {
		return data ? <p>{data}</p> : <p>{erc777.error}</p>;
	};

	return <div className="body"> Token Name: {tokenName()}</div>;
};
