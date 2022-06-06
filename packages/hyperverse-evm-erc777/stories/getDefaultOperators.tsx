import { useERC777 } from '../source';
import { useEffect, useState } from 'react';

export const GetDefaultOperators = ({ ...props }) => {
	const erc777 = useERC777();
	const [data, setData] = useState();

	useEffect(() => {
		if (erc777.getDefaultOperators) {
			erc777.getDefaultOperators().then(setData);
		}
	}, [erc777.getDefaultOperators]);

	const operators = () => {
		return data ? <p>{data}</p> : <p>{erc777.error}</p>;
	};

	return <div className="body"> Default Operators: {operators()}</div>;
};
