import * as PropTypes from 'prop-types';
import { useERC721 } from '../source';

export const GetBalance = ({ ...props }) => {
	const { Balance } = useERC721();
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
