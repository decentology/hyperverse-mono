import * as PropTypes from 'prop-types';
import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const GetDecimals = ({ ...props }) => {
	const erc777 = useERC777();
	const { address } = useEvm();
	const [data, setData] = useState();

	useEffect(() => {
		if (erc777.getDecimal) {
			erc777.getDecimal().then(setData);
		}
	}, [erc777.getDecimal]);

	const decimalsAvailable = () => {
		return data ? (
			<p>{data}</p>
		) : (
			<p>Error!</p>
		);
	};

	return <div className="decimals"> Decimal: {decimalsAvailable()}</div>;
};

GetDecimals.propTypes = {};

GetDecimals.defaultProps = {};
