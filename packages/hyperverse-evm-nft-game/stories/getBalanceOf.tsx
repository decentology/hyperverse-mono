import { useNFTGame } from '../source';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

export const GetBalanceOf = ({ ...props }: { account: string }) => {
	const nftGame = useNFTGame();
	const [data, setData] = useState<BigNumber>();

	useEffect(() => {
		if (nftGame.getBalanceOf) {
			nftGame.getBalanceOf(props.account).then(setData);
		}
	}, [nftGame.getBalanceOf]);

	const balanceAvailable = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(nftGame.error)}</p>;
	};

	return (
		<div className="body">
			{' '}
			Balance of: <b>{props.account}</b> {balanceAvailable()}
		</div>
	);
};