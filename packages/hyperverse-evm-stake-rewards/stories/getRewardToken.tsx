import * as PropTypes from 'prop-types';
import { useStakeRewards } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const GetRewardToken = ({ ...props }) => {
	const stakeRewards = useStakeRewards();
	const [data, setData] = useState();

	useEffect(() => {
		if (stakeRewards.getRewardToken) {
			stakeRewards.getRewardToken().then(setData);
		}
	}, [stakeRewards.getRewardToken]);

	const hasRewardTokens = () => {
		return data ? (
			<p>{data}</p>
		) : (
			<p>There are no reward tokens.</p>
		);
	};

	return <div className="rewardTokens"> Reward Tokens: {hasRewardTokens()}</div>;
};

GetRewardToken.propTypes = {};

GetRewardToken.defaultProps = {};
