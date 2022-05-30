import * as PropTypes from 'prop-types';
import { useERC20 } from '../source';
import { useEffect, useState } from 'react';

export const GetTokenSymbol = ({ symbol, ...props }) => {
	const erc20 = useERC20();
	const [data, setData] = useState(symbol);

	useEffect(() => {
		if (erc20.getTokenSymbol) {
			erc20.getTokenSymbol().then(setData);
		}
	}, [erc20.getTotalSuply]);

	const hasTokenSymbol = () => {
		return data ? (
			<p>{data}</p>
		) : (
			<p>There are no token symbol.</p>
		);
	};

	return <div className="tokenSymbol"> Token Symbol: {hasTokenSymbol()}</div>;
};

GetTokenSymbol.propTypes = {};

GetTokenSymbol.defaultProps = {};
