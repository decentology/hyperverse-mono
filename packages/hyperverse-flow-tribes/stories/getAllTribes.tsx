import * as PropTypes from 'prop-types';
import { useTribes } from '../source';

export const GetAllTribes = ({ tenantId, ...props }) => {
	console.log('this is the tenant id', tenantId)
	const { getAllTribes } = useTribes();
	const { data: allTribes } = getAllTribes(tenantId);

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
