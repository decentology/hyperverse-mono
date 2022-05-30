import * as PropTypes from 'prop-types';
import { useERC20 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const GetBalance = ({ balance, ...props }) => {
	const erc20 = useERC20();
	const { address } = useEvm();
	const [data, setData] = useState(balance);

	useEffect(() => {
		if (erc20.getBalance) {
			erc20.getBalance().then(setData);
		}
	}, [erc20.getBalance]);

	const balanceAvailable = () => {
		return data ? (
			<p>{data}</p>
		) : (
			<p>This is not a valid address.</p>
		);
	};

	return <div className="balance"> Balance: {balanceAvailable()}</div>;
};

GetBalance.propTypes = {};

GetBalance.defaultProps = {};
