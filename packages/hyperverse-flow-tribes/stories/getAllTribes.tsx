import * as PropTypes from 'prop-types';
import { useTribes } from '../source';

export const GetAllTribes = ({ ...props }) => {
	const { getAllTribes } = useTribes();
	const { data: allTribes } = getAllTribes(props.tenantId);

	return (
		<div className="allTribes">
			All Tribes: <b>{allTribes}</b>
		</div>
	);
};

GetAllTribes.propTypes = {
	tenantId: PropTypes.string.isRequired,
};

GetAllTribes.defaultProps = {};
