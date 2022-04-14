import * as PropTypes from 'prop-types';
import { useStakeRewards } from '../source';

export const GetReward = ({ ...props }) => {
	const { WithdrawReward } = useStakeRewards();
	const { data: reward } = WithdrawReward();

	return (
			<div className="reward">
				{/* Reward: <b>{reward}</b> */}
			</div>
	);
};

GetReward.propTypes = {
};

GetReward.defaultProps = {};
