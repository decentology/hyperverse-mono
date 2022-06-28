import { useNFTGame } from '../source';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

export const GetAttributes = ({ ...props }: { tokenId: number }) => {
	const nftGame = useNFTGame();
	const [data, setData] = useState<BigNumber>();

	useEffect(() => {
		if (nftGame.getAttributes) {
			nftGame.getAttributes(props.tokenId).then(setData);
		}
	}, [nftGame.getAttributes]);

	const checkAttributes = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(nftGame.error)}</p>;
	};

	return (
		<div className="body">
			{' '}
			Attributes: <b>{}</b> {checkAttributes()}
		</div>
	);
};