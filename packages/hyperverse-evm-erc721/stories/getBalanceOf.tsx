import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const GetBalanceOf = ({ ...props }: {account: string}) => {
	const erc721 = useERC721();
	const { address } = useEvm();
	const [data, setData] = useState(null);
	console.log('account', props.account);

	useEffect(() => {
		if (erc721.getBalanceOf) {
			erc721.getBalanceOf(props.account).then(setData);
		}
	}, [erc721.getBalanceOf]);

	const balanceAvailable = () => {
		return data ? (
			<p>{JSON.stringify(data)}</p>
		) : (
			<p>Error.</p>
		);
	};

	return <div className="balanceOf"> Balance of: {props.account} {balanceAvailable()}</div>;
};