import * as PropTypes from 'prop-types';
import { useTribes } from '../source';

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
