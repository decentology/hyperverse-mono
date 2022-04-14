import { use } from 'chai';
import * as PropTypes from 'prop-types';
import { useERC777 } from '../source';

export const IsOperatorFor = ({ ...props }) => {
	const { CheckOperator } = useERC777();
	const { data: operatorFor } = CheckOperator('', ''); // wants an operator and a token holder

	return (
		<div className="operatorFor">
			Operator For: <b>{operatorFor}</b>
		</div>
	);
};

IsOperatorFor.propTypes = {
	operator: PropTypes.string.isRequired,
	tokenHolder: PropTypes.string.isRequired
};

IsOperatorFor.defaultProps = {};
