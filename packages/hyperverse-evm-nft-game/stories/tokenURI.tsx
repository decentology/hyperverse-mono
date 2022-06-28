import { useNFTGame } from '../source';
import { useEffect, useState } from 'react';

export const TokenURI = ({ ...props }: { tokenId: number }) => {
	const nftGame = useNFTGame();
	const [data, setData] = useState();

	useEffect(() => {
		if (nftGame.tokenURI) {
			nftGame.tokenURI?.(props.tokenId).then(setData);
		}
	}, [nftGame.getBalanceOf]);

	const checkURI = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(nftGame.error)}</p>;
	};

	return <div className="body"> Token URI: {checkURI()}</div>;
};
