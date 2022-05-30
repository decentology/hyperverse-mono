import * as PropTypes from 'prop-types';
import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const GetDefaultOperators = ({ ...props }) => {
	const erc777 = useERC777();
	const { address } = useEvm();
	const [data, setData] = useState();

	useEffect(() => {
		if (erc777.getDefaultOperators) {
			erc777.getDefaultOperators().then(setData);
		}
	}, [erc777.getDefaultOperators]);

	const operators = () => {
		return data ? (
			<p>{data}</p>
		) : (
			<p>There are no operators.</p>
		);
	};

	return <div className="operators"> Default Operators: {operators()}</div>;
};

GetDefaultOperators.propTypes = {};

GetDefaultOperators.defaultProps = {};
