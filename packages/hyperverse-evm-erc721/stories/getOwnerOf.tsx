import { useERC721 } from '../source';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

export const GetOwnerOf = ({ ...props }: { account: string; tokenId: string }) => {
	const erc721 = useERC721();
	const [data, setData] = useState(props.account);

	useEffect(() => {
		if (erc721.getOwnerOf) {
			erc721.getOwnerOf(props.tokenId).then(setData);
		}
	}, [props.tokenId, props.account, erc721.getOwnerOf]);

	const owner = () => {
		return data ? (
			<p>{JSON.stringify(data)}</p>
		) : (
			<p>{erc721.error}</p>
		);
	};

	return <div className="body"> Owner of token <b>{props.tokenId}</b>: {owner()}</div>;
};
