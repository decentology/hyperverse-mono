import * as PropTypes from 'prop-types';
import { useERC777 } from '../source';

export const GetDefaultOperators = ({ ...props }) => {
	const { DefaultOperators } = useERC777();
	const { data: defaultOperators } = DefaultOperators();

	return (
			<div className="defaultOperators">
				Default Operators: <b>{defaultOperators}</b>
			</div>
	);
};

GetDefaultOperators.propTypes = {
};

GetDefaultOperators.defaultProps = {};
