import * as PropTypes from 'prop-types';
import { useERC20 } from '../source';
import { useEffect, useState } from 'react';

export const GetTokenName = ({ name, ...props }) => {
	const erc20 = useERC20();
	const [data, setData] = useState(name);

	useEffect(() => {
		if (erc20.getTokenName) {
			erc20.getTokenName().then(setData);
		}
	}, [erc20.getTokenName]);

	const hasTokenName = () => {
		return data ? (
			<p>{data}</p>
		) : (
			<p>There is no token name.</p>
		);
	};

	return <div className="tokenName"> Token Name: {hasTokenName()}</div>;
};

GetTokenName.propTypes = {};

GetTokenName.defaultProps = {};
