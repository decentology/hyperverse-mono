import { useERC721 } from '../source';
import { useEffect, useState } from 'react';

export const GetBaseURI = ({ ...props }) => {
	const erc721 = useERC721();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (erc721.getBaseURI) {
			erc721.getBaseURI?.().then(setData);
		}
	}, [erc721.getBalanceOf]);

	const baseURI = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(erc721.error)}</p>;
	};

	return <div className="body"> Base URI: {baseURI()}</div>;
};
