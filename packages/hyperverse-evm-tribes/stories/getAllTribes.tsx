import * as PropTypes from 'prop-types';
import './button.css';
import { useTribes } from '../source';

/**
 * Primary UI component for user interaction
 */
export const GetAllTribes = ({ ...props }) => {
	const { Tribes } = useTribes();
	const { data: tribes } = Tribes();
	console.log(tribes)

	return (
			<div className="tribes">
				All Tribes: <b>{tribes}</b>
			</div>
	);
};

GetAllTribes.propTypes = {
	/**
	 * Is this the principal call to action on the page?
	 */
	/**
	 * Optional click handler
	 */
};

GetAllTribes.defaultProps = {};
