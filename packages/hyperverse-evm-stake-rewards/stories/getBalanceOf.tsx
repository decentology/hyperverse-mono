import * as PropTypes from 'prop-types';
import { useStakeRewards } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';


export const GetBalanceOf = ({ ...props }) => {
	const stakeRewards = useStakeRewards();
	const { address } = useEvm();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (stakeRewards.getBalanceOf) {
			stakeRewards.getBalanceOf().then(setData);
		}
	}, [stakeRewards.getBalanceOf]);

	const hasBalance = () => {
		return data ? (
			<p>{data}</p>
		) : (
			<p>Error!</p>
		);
	};

	return <div className="balanceOf"> Balance Of: {hasBalance()}</div>;
};

GetBalanceOf.propTypes = {};

GetBalanceOf.defaultProps = {};
