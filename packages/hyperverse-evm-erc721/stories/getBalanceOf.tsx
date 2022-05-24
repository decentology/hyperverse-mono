import * as PropTypes from 'prop-types';
import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const GetBalanceOf = ({ ...props }) => {
	const erc721 = useERC721();
	const { address } = useEvm();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (erc721.getBalanceOf) {
			erc721.getBalanceOf('').then(setData);
		}
	}, [erc721.getBalanceOf]);

	return (
		<div className="balanceOf">
			<div>Balance Of: </div>
			<pre>{data}</pre>
		</div>
	);
};

GetBalanceOf.propTypes = {};

GetBalanceOf.defaultProps = {};
