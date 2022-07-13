import { useNFTGame } from '../source/react';
import { useEffect, useState } from 'react';

export const IsApprovedForAll = ({ ...props }: { owner: string; operator: string }) => {
	const nftGame = useNFTGame();
	const [data, setData] = useState();

	useEffect(() => {
		if (nftGame.isApprovedForAll) {
			nftGame.isApprovedForAll(props).then(setData);
		}
	}, [nftGame.isApprovedForAll]);

	const approveCheck = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(nftGame.error)}</p>;
	};

	return (
		<div className="body">
			{' '}
			Is Approved For All: {approveCheck()}
		</div>
	);
};
