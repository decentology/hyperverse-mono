import { useERC777 } from '../source';
import { useEffect, useState } from 'react';

export const GetGranularity = ({ ...props }) => {
	const erc777 = useERC777();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (erc777.getGranularity) {
			erc777.getGranularity().then(setData);
		}
	}, [erc777.getGranularity]);

	const granularity = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{erc777.error}</p>;
	};

	return <div className="body"> Granularity: {granularity()}</div>;
};
