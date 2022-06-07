import { useNFT } from '../source';
import { useEffect, useState } from 'react';

export const GetNFTID = ({ ...props }: { tenantId: string; account: string }) => {
	const flowNFT = useNFT();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (flowNFT.getNFTIDs) {
			flowNFT.getNFTIDs(props.tenantId, props.account).then(setData);
		}
	}, [flowNFT.getNFTIDs]);

	const availableNFT = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>Error.</p>;
	};

	return <div className="body"> NFT IDs: {availableNFT()}</div>;
};
