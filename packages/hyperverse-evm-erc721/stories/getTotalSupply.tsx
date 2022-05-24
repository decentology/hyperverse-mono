import * as PropTypes from 'prop-types';
import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const GetTotalSupply = ({ ...props }) => {
	const erc721 = useERC721();
	const { address } = useEvm();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (erc721.getTotalSuply) {
			erc721.getTotalSuply().then(setData);
		}
	}, [erc721.getTotalSuply]);

	const totalSupply = () => {
		return data ? (
			<p>{data}</p>
		) : (
			<p>There is no supply of tokens.</p>
		);
	};

	return <div className="totalSupply"> Total Supply: {totalSupply()}</div>;
};

GetTotalSupply.propTypes = {};

GetTotalSupply.defaultProps = {};
