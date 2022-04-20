import * as PropTypes from 'prop-types';
import { useERC777 } from '../source';

export const GetBalance = ({ ...props }) => {
	const { Balance } = useERC777();
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
