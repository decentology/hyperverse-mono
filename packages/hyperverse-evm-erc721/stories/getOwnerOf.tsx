import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const GetOwnerOf = ({ ...props }: {account: string, tokenId: string}) => {
	const erc721 = useERC721();
	const { address } = useEvm();
	const [data, setData] = useState(props.account);

	useEffect(() => {
		if (erc721.getOwnerOf) {
			erc721.getOwnerOf(props.tokenId).then(setData);
		}
	}, [props.tokenId, props.account, erc721.getOwnerOf]);

	const owner = () => {
		return data ? (
			<p>{data}</p>
		) : (
			<p>Error!</p>
		);
	};

	return <div className="ownerOf"> Owner of token {props.tokenId}: {owner()}</div>;
};
