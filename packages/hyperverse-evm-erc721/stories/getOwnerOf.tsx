import * as PropTypes from 'prop-types';
import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const GetOwnerOf = ({ ...props }) => {
	const erc721 = useERC721();
	const { address } = useEvm();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (erc721.getOwnerOf) {
			erc721.getOwnerOf('').then(setData);
		}
	}, [erc721.getOwnerOf]);

	return (
		<div className="ownerOf">
			<div>Owner Of: </div>
			<pre>{data}</pre>
		</div>
	);
};

GetOwnerOf.propTypes = {};

GetOwnerOf.defaultProps = {};
