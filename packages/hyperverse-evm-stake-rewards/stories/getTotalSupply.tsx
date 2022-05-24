import * as PropTypes from 'prop-types';
import { useStakeRewards } from '../source';
import { useEffect, useState } from 'react';

export const GetTotalSupply = ({ ...props }) => {
	const stakeRewards = useStakeRewards();
	const [data, setData] = useState();

	useEffect(() => {
		if (stakeRewards.getTotalSuply) {
			stakeRewards.getTotalSuply().then(setData);
		}
	}, [stakeRewards.getTotalSuply]);

	const hasTokenSupply = () => {
		return data ? (
			<p>{data}</p>
		) : (
			<p>There is are no tokens.</p>
		);
	};

	return <div className="stakeToken"> Stake Token: {hasTokenSupply()}</div>;
};

GetTotalSupply.propTypes = {};

GetTotalSupply.defaultProps = {};
