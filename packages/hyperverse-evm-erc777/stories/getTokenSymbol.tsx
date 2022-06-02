import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const GetTokenSymbol = ({ ...props }) => {
	const erc777 = useERC777();
	const { address } = useEvm();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (erc777.getTokenSymbol) {
			erc777.getTokenSymbol().then(setData);
		}
	}, [erc777.getTokenSymbol]);

	const tokenSymbol = () => {
		return data ? (
			<p>{JSON.stringify(data)}</p>
		) : (
			<p>There is no token symbol.</p>
		);
	};

	return <div className="tokenSymbol"> Token Symbol: {tokenSymbol()}</div>;
};