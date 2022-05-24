import * as PropTypes from 'prop-types';
import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const GetBalanceOf = ({ account, ...props }) => {
	const erc777 = useERC777();
	const { address } = useEvm();
	const [data, setData] = useState(account);

	useEffect(() => {
		if (erc777.getBalanceOf) {
			erc777.getBalanceOf().then(setData);
		}
	}, [erc777.getBalanceOf]);

	const balanceAvailable = () => {
		return data ? (
			<p>{data}</p>
		) : (
			<p>This is not a valid address.</p>
		);
	};

	return <div className="balanceOf"> Balance Of: {balanceAvailable()}</div>;
};

GetBalanceOf.propTypes = {};

GetBalanceOf.defaultProps = {};
