import * as PropTypes from 'prop-types';
import { useERC20 } from '../source';
import { useEffect, useState } from 'react';

export const GetTotalSupply = ({ total, ...props }) => {
	const erc20 = useERC20();
	const [data, setData] = useState(total);

	useEffect(() => {
		if (erc20.getTotalSuply) {
			erc20.getTotalSuply().then(setData);
		}
	}, [erc20.getTotalSuply]);

	const hasTokens = () => {
		return data ? (
			<p>{data}</p>
		) : (
			<p>There are no tokens.</p>
		);
	};

	return <div className="totalSupply"> Total Supply: {hasTokens()}</div>;
};

GetTotalSupply.propTypes = {};

GetTotalSupply.defaultProps = {};
