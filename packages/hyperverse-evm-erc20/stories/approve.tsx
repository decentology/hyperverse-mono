import * as PropTypes from 'prop-types';
import { useERC20 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';

export const Approve = ({ ...props }) => {
	const { Approve } = useERC20();
    const { address } = useEvm();
	const { mutate } = Approve();

	return (
		// <div className="allowance">
		// 	Allowance: <b>{allowance}</b>
		// </div>
	);
};

Approve.propTypes = {
    spender: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
};

Approve.defaultProps = {};
