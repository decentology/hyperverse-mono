import * as PropTypes from 'prop-types';
import { useERC777 } from '../source';

export const GetBalanceOf = ({ ...props }) => {
	const { BalanceOf } = useERC777();
	const { data: balanceOf } = BalanceOf(''); // wants an account

	return (
			<div className="balanceOf">
				Balance Of: <b>{balanceOf}</b>
			</div>
	);
};

GetBalanceOf.propTypes = {
	account: PropTypes.string.isRequired
};

GetBalanceOf.defaultProps = {};
