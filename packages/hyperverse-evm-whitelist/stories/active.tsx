import { useWhitelist } from '../source';
import { useEffect, useState } from 'react';

export const Active = ({ ...props }) => {
	const whitelist = useWhitelist();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (whitelist.active) {
			whitelist.active().then(setData);
		}
	}, [whitelist.active]);

	const checkActive = () => {
		return data ? <p>(data)</p> : <p>{whitelist.error}</p>;
	};

	return <div className="body"> Active Status: {checkActive()}</div>;
};
