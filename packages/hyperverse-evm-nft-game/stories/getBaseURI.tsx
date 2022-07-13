import { useNFTGame } from '../source/react';
import { useEffect, useState } from 'react';

export const GetBaseURI = ({ ...props }) => {
	const nftGame = useNFTGame();
	const [data, setData] = useState();

	useEffect(() => {
		if (nftGame.getBaseURI) {
			nftGame.getBaseURI().then(setData);
		}
	}, [nftGame.getBaseURI]);

	const checkBaseURI = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(nftGame.error)}</p>;
	};

	return <div className="body"> Base URI: {checkBaseURI()}</div>;
};
