import * as PropTypes from 'prop-types';
import { useStakeRewards } from '../source';
import { useEffect, useState } from 'react';

export const GetStakeToken = ({ ...props }) => {
	const stakeRewards = useStakeRewards();
	const [data, setData] = useState();

	useEffect(() => {
		if (stakeRewards.getStakeToken) {
			stakeRewards.getStakeToken().then(setData);
		}
	}, [stakeRewards.getStakeToken]);

	const hasStakeToken = () => {
		return data ? (
			<p>{data}</p>
		) : (
			<p>There is no stake token.</p>
		);
	};

	return <div className="stakeToken"> Stake Token: {hasStakeToken()}</div>;
};

GetStakeToken.propTypes = {
};

GetStakeToken.defaultProps = {};
