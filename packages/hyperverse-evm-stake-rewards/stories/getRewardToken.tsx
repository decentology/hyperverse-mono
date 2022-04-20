import * as PropTypes from 'prop-types';
import { useStakeRewards } from '../source';

export const GetRewardToken = ({ ...props }) => {
	const { RewardTokenContract } = useStakeRewards();
	const { data: rewardToken } = RewardTokenContract();

	return (
			<div className="rewardToken">
				Reward Token: <b>{rewardToken}</b>
			</div>
	);
};

GetRewardToken.propTypes = {
};

GetRewardToken.defaultProps = {};
