import { useNFTGame } from '../source/react';
import { useEffect, useState } from 'react';

export const GetOwnerOf = ({ ...props }: { tokenId: string}) => {
	const nftGame1 = useNFTGame();
	const [data, setData] = useState();

	useEffect(() => {
		if (nftGame1.getOwnerOf) {
			nftGame1.getOwnerOf(props.tokenId).then(setData);
		}
	}, [props.tokenId, nftGame1.getOwnerOf]);

	const owner = () => {
		return data ? (
			<p>{JSON.stringify(data)}</p>
		) : (
			<p>{JSON.stringify(nftGame1.error)}</p>
		);
	};

	return <div className="body"> Owner of token {props.tokenId}: {owner()}</div>;
};
