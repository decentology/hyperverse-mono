import { useNFTGame1 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const GetBalanceOf = ({ ...props }: {account: string}) => {
	const nftGame1 = useNFTGame1();
	const { address } = useEvm();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (nftGame1.getBalanceOf) {
			nftGame1.getBalanceOf(props.account).then(setData);
		}
	}, [nftGame1.getBalanceOf]);

	const balanceAvailable = () => {
		return data ? (
			<p>{JSON.stringify(data)}</p>
		) : (
			<p>Error.</p>
		);
	};

	return <div className="balanceOf"> Balance of: {props.account} {balanceAvailable()}</div>;
};