import * as PropTypes from 'prop-types';
import { useStakeRewards } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';

export const GetEarned = ({ ...props }) => {
	const { Earned } = useStakeRewards();
	const { address } = useEvm();
	const { data: earned } = Earned(''); // wants an account

	return (
		<div className="earned">
			Earned: <b>{earned}</b>
		</div>
	);
};

GetEarned.propTypes = {
	account: PropTypes.string.isRequired,
};

GetEarned.defaultProps = {};
