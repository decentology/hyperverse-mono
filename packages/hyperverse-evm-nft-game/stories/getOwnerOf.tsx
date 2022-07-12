import { useNFTGame } from '../source/react';
import { useEffect, useState } from 'react';

export const GetOwnerOf = ({ ...props }: { tokenId: string}) => {
	const nftGame = useNFTGame();
	const [data, setData] = useState();

	useEffect(() => {
		if (nftGame.getOwnerOf) {
			nftGame.getOwnerOf(props.tokenId).then(setData);
		}
	}, [props.tokenId, nftGame.getOwnerOf]);

	const owner = () => {
		return data ? (
			<p>{JSON.stringify(data)}</p>
		) : (
			<p>{JSON.stringify(nftGame.error)}</p>
		);
	};

	return <div className="body"> Owner of token {props.tokenId}: {owner()}</div>;
};
