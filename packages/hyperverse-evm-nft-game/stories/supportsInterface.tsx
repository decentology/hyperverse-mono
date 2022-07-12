import { useNFTGame } from '../source/react';
import { useEffect, useState } from 'react';

export const SupportsInterface = ({ ...props }: { interfaceId: string }) => {
	const nftGame = useNFTGame();
	const [data, setData] = useState();

	useEffect(() => {
		if (nftGame.supportsInterface) {
			nftGame.supportsInterface(props.interfaceId).then(setData);
		}
	}, [nftGame.supportsInterface]);

	const interfaceCheck = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(nftGame.error)}</p>;
	};

	return <div className="body"> Supports Interface: {interfaceCheck()}</div>;
};
