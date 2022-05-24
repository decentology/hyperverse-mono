import * as PropTypes from 'prop-types';
import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const GetOwnerOf = ({ account, ...props }) => {
	const erc721 = useERC721();
	const { address } = useEvm();
	const [data, setData] = useState(account);

	useEffect(() => {
		if (erc721.getOwnerOf) {
			erc721.getOwnerOf().then(setData);
		}
	}, [erc721.getOwnerOf]);

	const owner = () => {
		return data ? (
			<p>{data}</p>
		) : (
			<p>Error!</p>
		);
	};

	return <div className="ownerOf"> Owner Of: {owner()}</div>;
};

GetOwnerOf.propTypes = {};

GetOwnerOf.defaultProps = {};
