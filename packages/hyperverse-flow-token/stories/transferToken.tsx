import * as PropTypes from 'prop-types';
import { useToken } from '../source';

export const TransferToken = ({ ...props }) => {
	const { transferToken } = useToken();
	// const {  } = transferToken(props.tenantId, props.recipient, props.amount);

	return (
		<div className="transferToken">
			{/* Total Supply: <b>{totalSupply}</b> */}
		</div>
	);
};

TransferToken.propTypes = {
    tenantId: PropTypes.string.isRequired,
	recipient: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired
};

TransferToken.defaultProps = {};
