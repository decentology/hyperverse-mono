import * as PropTypes from 'prop-types';
import { useERC20 } from '../source';

export const GetBalanceOf = ({ ...props }) => {
	const { BalanceOf } = useERC20();
	const { data: balanceOf } = BalanceOf(''); // wants an account address

	return (
			<div className="balanceOf">
				BalanceOf: <b>{balanceOf}</b>
			</div>
	);
};

GetBalanceOf.propTypes = {
	account: PropTypes.string.isRequired
};

GetBalanceOf.defaultProps = {};
