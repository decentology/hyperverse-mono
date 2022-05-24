import * as PropTypes from 'prop-types';
import { useERC20 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';
import { useEffect, useState } from 'react';

export const GetBalanceOf = ({ balance, ...props }) => {
	const erc20 = useERC20();
	const { address } = useEvm();
	const [data, setData] = useState(balance);

	useEffect(() => {
		if (erc20.getBalanceOf) {
			erc20.getBalanceOf('').then(setData);
		}
	}, [erc20.getBalanceOf]);

	const validAddress = () => {
		return data ? (
			<p>{data}</p>
		) : (
			<p>This is not a valid address.</p>
		);
	};

	return <div className="balanceOf"> Balance Of {address}: {validAddress()}</div>;
};

GetBalanceOf.propTypes = {};

GetBalanceOf.defaultProps = {};
