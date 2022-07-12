import { useNFTGame } from '../source/react';
import { useEffect, useState } from 'react';

export const GetSymbol = ({ ...props }) => {
	const nftGame = useNFTGame();
	const [data, setData] = useState('');

	useEffect(() => {
		if (nftGame.getSymbol) {
			nftGame.getSymbol().then(setData);
		}
	}, [nftGame.getSymbol]);

	const symbolCheck = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(nftGame.error)}</p>;
	};

	return <div className="body"> Symbol: {symbolCheck()}</div>;
};
