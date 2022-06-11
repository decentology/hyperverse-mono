import { useWhitelist } from '../source';
import { useEffect, useState } from 'react';

export const HasClaimed = ({ ...props }: { address: string }) => {
	const whitelist = useWhitelist();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (whitelist.hasClaimed) {
			whitelist.hasClaimed(props.address).then(setData);
		}
	}, [whitelist.hasClaimed]);

	const claimed = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{whitelist.error}</p>;
	};

	return <div className="body"> Has Claimed: {claimed()}</div>;
};
