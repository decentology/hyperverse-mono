import { useNFTGame } from '../source/react';
import { useEffect, useState } from 'react';

export const GetAttributesByTokenId = ({ ...props }: { tokenId: number }) => {
	const nftGame = useNFTGame();
	const [data, setData] = useState('');

	useEffect(() => {
		if (nftGame.getAttributesByTokenId) {
			nftGame.getAttributesByTokenId(props.tokenId).then(setData);
		}
	}, [nftGame.getAttributesByTokenId]);

	const attributeCheck = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(nftGame.error)}</p>;
	};

	return <div className="body"> Attributes: {attributeCheck()}</div>;
};
