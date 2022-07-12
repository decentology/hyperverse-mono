import { useNFTGame } from '../source/react';
import { useEffect, useState } from 'react';

export const GetName = ({ ...props }) => {
	const nftGame = useNFTGame();
	const [data, setData] = useState('');

	useEffect(() => {
		if (nftGame.getName) {
			nftGame.getName().then(setData);
		}
	}, [nftGame.getName]);

	const nameCheck = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(nftGame.error)}</p>;
	};

	return <div className="body"> Name: {nameCheck()}</div>;
};
