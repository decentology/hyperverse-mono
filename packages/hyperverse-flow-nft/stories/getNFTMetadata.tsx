import { useNFT } from '../source';
import { useEffect, useState } from 'react';

export const GetNFTMetadata = ({ ...props }: { tenantId: string; id: number; account: string }) => {
	const flowNFT = useNFT();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (flowNFT.getNFTMetadata) {
			flowNFT.getNFTMetadata().then(setData);
		}
	}, [flowNFT.getNFTMetadata]);

	const availableMetadata = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>Error.</p>;
	};

	return <div className="body"> NFT Metadata: {availableMetadata()}</div>;
};
