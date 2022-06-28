import { useNFTGame } from '../source';
import { useEffect, useState } from 'react';

export const GetBaseURI = ({ ...props }) => {
	const nftGame = useNFTGame();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (nftGame.getBaseURI) {
			nftGame.getBaseURI?.().then(setData);
		}
	}, [nftGame.getBalanceOf]);

	const baseURI = () => {
		return data ? <p>{data}</p> : <p>{JSON.stringify(nftGame.error)}</p>;
	};

	return <div className="body"> Base URI: {baseURI()}</div>;
};
