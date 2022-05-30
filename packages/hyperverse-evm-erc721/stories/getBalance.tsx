import { useEffect, useState } from 'react';
import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const GetBalance = ({ balance, ...props }) => {
	const erc721 = useERC721();
	const { address } = useEvm();
	const [data, setData] = useState(balance);

	useEffect(() => {
		if (erc721.getBalance) {
			erc721.getBalance().then(setData);
		}
	}, [erc721.getBalance]);

	const balanceAvailable = () => {
		return data ? (
			<p>{data}</p>
		) : (
			<p>This is not a valid address.</p>
		);
	};

	return <div className="balance"> Balance: {balanceAvailable()}</div>;
};
