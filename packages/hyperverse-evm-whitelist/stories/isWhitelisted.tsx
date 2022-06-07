import { useWhitelist } from '../source';
import { useEffect, useState } from 'react';

export const IsWhitelisted = ({ ...props }: { account: string }) => {
	const whitelist = useWhitelist();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (whitelist.isWhitelisted) {
			whitelist.isWhitelisted(props.account).then(setData);
		}
	}, [whitelist.isWhitelisted]);

	const checkMerkle = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{whitelist.error}</p>;
	};

	return <div className="body"> Is Whitelisted: {checkMerkle()}</div>;
};
