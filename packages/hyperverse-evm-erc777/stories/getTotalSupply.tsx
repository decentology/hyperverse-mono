import * as PropTypes from 'prop-types';
import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const GetTotalSupply = ({ ...props }) => {
	const erc777 = useERC777();
	const { address } = useEvm();
	const [data, setData] = useState();

	useEffect(() => {
		if (erc777.getTotalSupply) {
			erc777.getTotalSupply().then(setData);
		}
	}, [erc777.getTotalSupply]);

	const totalSupply = () => {
		return data ? (
			<p>{data}</p>
		) : (
			<p>That token does not exist.</p>
		);
	};

	return <div className="totalSupply"> Total Supply: {totalSupply()}</div>;
};

GetTotalSupply.propTypes = {
};

GetTotalSupply.defaultProps = {};
