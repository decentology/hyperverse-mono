import { useEffect, useState } from 'react';
import { useERC721 } from '../source';

export const GetBalance = ({ ...props }) => {
	const { getBalance } = useERC721();
	const [balance, setBalance] = useState(0);
	useEffect(() => {
		if (getBalance) {
			getBalance().then((value) => {
				setBalance(value.toNumber());
			});
		}
	}, [getBalance]);
	return (
		<div className="Balance">
			Balance: <b>{balance}</b>
		</div>
	);
};
