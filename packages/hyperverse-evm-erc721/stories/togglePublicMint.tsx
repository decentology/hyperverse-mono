import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const TogglePublicMint = ({ ...props }) => {
	const erc721 = useERC721();
	const { address } = useEvm();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (erc721.togglePublicMint) {
			erc721.togglePublicMint().then(setData);
		}
	}, [erc721.togglePublicMint]);

	const toggle = () => {
		return data ? (
			<p>{data}</p>
		) : (
			<p>Error.</p>
		);
	};

	return <div className="toggle"> Toggle: {toggle()}</div>;
};