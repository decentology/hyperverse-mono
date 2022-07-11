import { useERC721 } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm/react';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

export const GetBalanceOf = ({ ...props }: { account: string }) => {
	const erc721 = useERC721();
	const { address } = useEvm();
	const [data, setData] = useState<BigNumber>();

	useEffect(() => {
		if (erc721.getBalanceOf) {
			erc721.getBalanceOf(props.account).then(setData);
		}
	}, [erc721.getBalanceOf]);

	const balanceAvailable = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(erc721.error)}</p>;
	};

	return <div className="body"> Balance of: {props.account} {balanceAvailable()}</div>;
};
