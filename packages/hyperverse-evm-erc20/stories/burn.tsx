import * as PropTypes from 'prop-types';
import { useERC20 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';

export const Burn = ({ ...props }) => {
	const { Burn } = useERC20();
    const { address } = useEvm();
	const { mutate } = Burn();

	return (
		// <div className="allowance">
		// 	Allowance: <b>{allowance}</b>
		// </div>
	);
};

Burn.propTypes = {
    amount: PropTypes.number.isRequired
};

Burn.defaultProps = {};
