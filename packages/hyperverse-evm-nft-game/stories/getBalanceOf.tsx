import { useNFTGame } from '../source/react';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

export const GetBalanceOf = ({ ...props }: {account: string}) => {
	const nftGame1 = useNFTGame();
	const [data, setData] = useState<BigNumber>();

	useEffect(() => {
		if (nftGame1.getBalanceOf) {
			nftGame1.getBalanceOf(props.account).then(setData);
		}
	}, [nftGame1.getBalanceOf]);

	const balanceAvailable = () => {
		return data ? (
			<p>{JSON.stringify(data)}</p>
		) : (
			<p>{JSON.stringify(nftGame1.error)}</p>
		);
	};

	return <div className="body"> Balance of: {props.account} {balanceAvailable()}</div>;
};