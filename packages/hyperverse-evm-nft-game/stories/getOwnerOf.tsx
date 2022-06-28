import { useNFTGame } from '../source';
import { useEffect, useState } from 'react';

export const GetOwnerOf = ({ ...props }: { tokenId: string }) => {
	const nftGame = useNFTGame();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (nftGame.getOwnerOf) {
			nftGame.getOwnerOf(props.tokenId).then(setData);
		}
	}, [nftGame.getOwnerOf]);

	const owner = () => {
		return data ? (
			<p>{JSON.stringify(data)}</p>
		) : (
			<p>{nftGame.error}</p>
		);
	};

	return <div className="body"> Owner of token <b>{props.tokenId}</b>: {owner()}</div>;
};
