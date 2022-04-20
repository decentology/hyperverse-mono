import * as PropTypes from 'prop-types';
import { useStakeRewards } from '../source';

export const GetBalance = ({ ...props }) => {
	const { Balance } = useStakeRewards();
	const { data: balance } = Balance();

	return (
			<div className="Balance">
				Balance: <b>{balance}</b>
			</div>
	);
};

GetBalance.propTypes = {
};

GetBalance.defaultProps = {};
