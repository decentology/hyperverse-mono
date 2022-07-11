import { useERC721 } from '../source/react';
import { useEffect, useState } from 'react';

export const TokenURI = ({ ...props }: { tokenId: number }) => {
	const erc721 = useERC721();
	const [data, setData] = useState();

	useEffect(() => {
		if (erc721.tokenURI) {
			erc721.tokenURI?.(props.tokenId).then(setData);
		}
	}, [erc721.getBalanceOf]);
	console.log(props.tokenId)

	const checkURI = () => {
		console.log('in check')
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(erc721.error)}</p>;
	};

	return <div className="body"> Token URI: {checkURI()}</div>;
};
