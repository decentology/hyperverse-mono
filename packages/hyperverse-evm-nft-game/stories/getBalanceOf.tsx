import React from 'react';
import { useNFTGame } from '../source/react';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

export const GetBalanceOf = ({ ...props }: {account: string}) => {
	const nftGame = useNFTGame();
	const [data, setData] = useState<BigNumber>();

	useEffect(() => {
		if (nftGame.getBalanceOf) {
			nftGame.getBalanceOf(props.account).then(setData);
		}
	}, [nftGame.getBalanceOf]);

	const balanceAvailable = () => {
		return data ? (
			<p>{JSON.stringify(data)}</p>
		) : (
			<p>{JSON.stringify(nftGame.error)}</p>
		);
	};

	return <div className="body"> Balance of: {props.account} {balanceAvailable()}</div>;
};
