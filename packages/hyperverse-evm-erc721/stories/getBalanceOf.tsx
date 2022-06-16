import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

export const GetBalanceOf = ({ ...props }: { account: string }) => {
	const erc721 = useERC721();
	const { address } = useEvm();
	const [data, setData] = useState<BigNumber | null>(null);

	useEffect(() => {
		if (erc721.getBalanceOf) {
			erc721.getBalanceOf(props.account).then(setData);
		}
	}, [erc721.getBalanceOf]);

	const balanceAvailable = () => {
		return data ? (
			<p>{JSON.stringify(data)}</p>
		) : (
			<p>
				<b>Error:</b>{' '}
				{JSON.stringify(data)}
			</p>
		);
	};

	return (
		<div className="body">
			{' '}
			Balance of: <b>{props.account}</b> {balanceAvailable()}
		</div>
	);
};
