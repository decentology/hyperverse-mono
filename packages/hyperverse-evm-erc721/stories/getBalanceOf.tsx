import { useEffect, useState } from 'react';
import { useERC721 } from '../source';

export const GetBalanceOf = ({ ...props }: { account: string }) => {
	const { getBalanceOf } = useERC721();
	const [balance, setBalance] = useState(0);
	useEffect(() => {
		if (getBalanceOf) {
			getBalanceOf(props.account).then((value) => {
				setBalance(value.toNumber());
			});
		}
	}, [getBalanceOf]);
	return (
		<div className="balanceOf">
			BalanceOf: <b>{balance}</b>
		</div>
	);
};
