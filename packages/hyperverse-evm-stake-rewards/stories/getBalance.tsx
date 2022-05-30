import * as PropTypes from 'prop-types';
import { useStakeRewards } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const GetBalance = ({ ...props }) => {
	const stakeRewards = useStakeRewards();
	const { address } = useEvm();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (stakeRewards.getBalance) {
			stakeRewards.getBalance().then(setData);
		}
	}, [stakeRewards.getBalance]);

	const hasBalance = () => {
		return data ? (
			<p>{data}</p>
		) : (
			<p>Error!</p>
		);
	};

	return <div className="balance"> Balance: {hasBalance()}</div>;
};

GetBalance.propTypes = {};

GetBalance.defaultProps = {};
