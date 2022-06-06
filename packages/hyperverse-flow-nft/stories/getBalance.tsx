import { useNFT } from '../source';
import { useEffect, useState } from 'react';

export const GetBalance = ({ ...props }: { tenantId: string; account: string }) => {
	const flowNFT = useNFT();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (flowNFT.getBalance) {
			flowNFT.getBalance().then(setData);
		}
	}, [flowNFT.getBalance]);

	const balanceAvailable = () => {
		return data ? <p>{data} tokens</p> : <p>Error.</p>;
	};

	return <div className="body"> Balance: {balanceAvailable()}</div>;
};
