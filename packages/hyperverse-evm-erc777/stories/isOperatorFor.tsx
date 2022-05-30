import * as PropTypes from 'prop-types';
import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const IsOperatorFor = ({ ...props }) => {
	const erc777 = useERC777();
	const { address } = useEvm();
	const [data, setData] = useState();

	useEffect(() => {
		if (erc777.checkOperator) {
			erc777.checkOperator().then(setData);
		}
	}, [erc777.checkOperator]);

	const operatorExists = () => {
		return data ? (
			<p>{JSON.stringify(data)}</p>
		) : (
			<p>This account is not an operator.</p>
		);
	};

	return <div className="operator"> Operator For: {operatorExists()}</div>;
};

IsOperatorFor.propTypes = {};

IsOperatorFor.defaultProps = {};
