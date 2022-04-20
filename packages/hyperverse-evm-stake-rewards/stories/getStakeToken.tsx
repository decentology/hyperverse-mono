import * as PropTypes from 'prop-types';
import { useStakeRewards } from '../source';

export const GetStakeToken = ({ ...props }) => {
	const { StakeTokenContract } = useStakeRewards();
	const { data: stakeToken } = StakeTokenContract();

	return (
			<div className="stakeToken">
				Stake Token: <b>{stakeToken}</b>
			</div>
	);
};

GetStakeToken.propTypes = {
};

GetStakeToken.defaultProps = {};
