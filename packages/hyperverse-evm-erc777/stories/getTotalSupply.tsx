import { useERC777 } from '../source';
import { useEffect, useState } from 'react';

export const GetTotalSupply = ({ ...props }) => {
	const erc777 = useERC777();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (erc777.getTotalSuply) {
			erc777.getTotalSuply().then(setData);
		}
	}, [erc777.getTotalSuply]);

	const totalSupply = () => {
		return data ? <p>{data} tokens</p> : <p>{erc777.error}</p>;
	};

	return <div className="body"> Total Supply: {totalSupply()}</div>;
};
