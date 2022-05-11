import * as PropTypes from 'prop-types';
import { useToken } from '../source';

export const GetBalance = ({ ...props }) => {
	const { getBalance } = useToken();
	const { data: balance } = getBalance(props.tenantId, props.account);

	return (
		<div className="balance">
			Balance: <b>{balance}</b>
		</div>
	);
};

GetBalance.propTypes = {
	tenantId: PropTypes.string.isRequired,
    account: PropTypes.string.isRequired
};

GetBalance.defaultProps = {};
