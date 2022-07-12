import { useERC721 } from '../source/react';
import { useEffect, useState } from 'react';

export const ContractBalance = ({ ...props }) => {
	const erc721 = useERC721();
	const [data, setData] = useState();

	useEffect(() => {
		if (erc721.contractBalance) {
			erc721.contractBalance().then(setData);
		}
	}, [erc721.contractBalance]);

	const balanceAvailable = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(erc721.error)}</p>;
	};

	return <div className="body"> Contract Balance: {balanceAvailable()}</div>;
};
