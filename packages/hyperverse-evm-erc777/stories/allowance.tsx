import * as PropTypes from 'prop-types';
import { useERC777 } from '../source';

export const Allowance = ({ ...props }) => {
	const { Allowance } = useERC777();
	const { data: allowance } = Allowance('', ''); // wants an owner and a spender

	return (
			<div className="allowance">
				Allowance: <b>{allowance}</b>
			</div>
	);
};

Allowance.propTypes = {
	owner: PropTypes.string.isRequired,
	spender: PropTypes.string.isRequired
};

Allowance.defaultProps = {};
