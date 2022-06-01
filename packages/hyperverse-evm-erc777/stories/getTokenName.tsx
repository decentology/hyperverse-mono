import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const GetTokenName = ({ ...props }) => {
	const erc777 = useERC777();
	const { address } = useEvm();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (erc777.getTokenName) {
			erc777.getTokenName().then(setData);
		}
	}, [erc777.getTokenName]);

	const tokenName = () => {
		return data ? (
			<p>{JSON.stringify(data)}</p>
		) : (
			<p>There is no token name.</p>
		);
	};

	return <div className="tokenName"> Token Name: {tokenName()}</div>;
};