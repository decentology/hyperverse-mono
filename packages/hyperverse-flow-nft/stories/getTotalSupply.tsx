import { useNFT } from '../source';
import { useEffect, useState } from 'react';

export const GetTotalSupply = ({ ...props }: { tenantId: string }) => {
	const flowNFT = useNFT();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (flowNFT.getTotalSupply) {
			flowNFT.getTotalSupply().then(setData);
		}
	}, [flowNFT.getTotalSupply]);

	const tokenSupply = () => {
		return data ? <p>{data} tokens</p> : <p>Error.</p>;
	};

	return <div className="body"> Total Supply: {tokenSupply()}</div>;
};
