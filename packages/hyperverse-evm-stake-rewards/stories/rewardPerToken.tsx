import * as PropTypes from 'prop-types';
import { useStakeRewards } from '../source';
import { useEffect, useState } from 'react';

export const RewardPerToken = ({ ...props }) => {
	const stakeRewards = useStakeRewards();
	const [data, setData] = useState();

	useEffect(() => {
		if (stakeRewards.rewardPerToken) {
			stakeRewards.rewardPerToken().then(setData);
		}
	}, [stakeRewards.rewardPerToken]);

	const hasRewardToken = () => {
		return data ? (
			<p>{data}</p>
		) : (
			<p>There is no reward token.</p>
		);
	};

	return <div className="rewardToken"> Reward Token: {hasRewardToken()}</div>;
};

RewardPerToken.propTypes = {};

RewardPerToken.defaultProps = {};
