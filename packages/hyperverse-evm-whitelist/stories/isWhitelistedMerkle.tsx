import { useWhitelist } from '../source';
import { useEffect, useState } from 'react';

export const IsWhitelistedMerkle = ({ ...props }: { account: string }) => {
	const whitelist = useWhitelist();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (whitelist.isWhitelistedMerkle) {
			whitelist.isWhitelistedMerkle(props.account).then(setData);
		}
	}, [whitelist.isWhitelistedMerkle]);

	const checkMerkle = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{whitelist.error}</p>;
	};

	return <div className="body"> Is Whitelisted Merkle: {checkMerkle()}</div>;
};
