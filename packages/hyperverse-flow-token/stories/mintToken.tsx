import * as PropTypes from 'prop-types';
import { useToken } from '../source';

export const MintToken = ({ ...props }) => {
	const { mintToken } = useToken();
	// const {  } = mintToken(props.recipient, props.amount);

	return (
		<div className="totalSupply">
			{/* Total Supply: <b>{totalSupply}</b> */}
		</div>
	);
};

MintToken.propTypes = {
	recipient: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired
};

MintToken.defaultProps = {};
