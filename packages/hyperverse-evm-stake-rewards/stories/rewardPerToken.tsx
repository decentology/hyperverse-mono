import * as PropTypes from 'prop-types';
import './button.css';
import { useStakeRewards } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';

export const RewardPerToken = ({ ...props }) => {
	const { RewardPerToken } = useStakeRewards();
	const { data: reward } = RewardPerToken();

	return (
		<div className="RewardPerToken">
			Reward per Token: <b>{reward}</b>
		</div>
	);
};

RewardPerToken.propTypes = {};

RewardPerToken.defaultProps = {};
