import * as PropTypes from 'prop-types';
import { useTribes } from '../source';

/**
 * Primary UI component for user interaction
 */
export const GetTotalTenants = ({ ...props }) => {
	const { TotalTenants } = useTribes();
	const { data: totalTenants } = TotalTenants();

	return (
			<div className="totalTenants">
				Total Tenants: <b>{totalTenants}</b>
			</div>
	);
};

GetTotalTenants.propTypes = {
};

GetTotalTenants.defaultProps = {};
