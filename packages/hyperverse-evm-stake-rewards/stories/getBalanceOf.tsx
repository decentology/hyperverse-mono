import * as PropTypes from 'prop-types';
import { useStakeRewards } from '../source';

export const GetBalanceOf = ({ ...props }) => {
	const { BalanceOf } = useStakeRewards();
	const { data: balanceOf } = BalanceOf(''); // wants an account

	return (
			<div className="balanceOf">
				Balance Of: <b>{balanceOf}</b>
			</div>
	);
};

GetBalanceOf.propTypes = {
};

GetBalanceOf.defaultProps = {};
