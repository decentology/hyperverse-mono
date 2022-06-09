import { useERC777 } from '../source';
import { useEffect, useState } from 'react';

export const GetDecimals = ({ ...props }) => {
	const erc777 = useERC777();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (erc777.getDecimal) {
			erc777.getDecimal().then(setData);
		}
	}, [erc777.getDecimal]);

	const decimalsAvailable = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{erc777.error}</p>;
	};

	return <div className="body"> Decimal: {decimalsAvailable()}</div>;
};
