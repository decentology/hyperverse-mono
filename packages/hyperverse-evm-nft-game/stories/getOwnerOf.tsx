import { useNFTGame1 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const GetOwnerOf = ({ ...props }: {account: string, tokenId: string}) => {
	const nftGame1 = useNFTGame1();
	const { address } = useEvm();
	const [data, setData] = useState(props.account);

	useEffect(() => {
		if (nftGame1.getOwnerOf) {
			nftGame1.getOwnerOf(props.tokenId).then(setData);
		}
	}, [props.tokenId, props.account, nftGame1.getOwnerOf]);

	const owner = () => {
		return data ? (
			<p>{data}</p>
		) : (
			<p>Error!</p>
		);
	};

	return <div className="ownerOf"> Owner of token {props.tokenId}: {owner()}</div>;
};
