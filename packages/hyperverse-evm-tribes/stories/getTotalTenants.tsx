import * as PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useState, useEffect } from 'react';

export const GetTotalTenants = ({ tenants, ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState(tenants);

	useEffect(() => {
		if(tribes.getTotalTenants){
			tribes.getTotalTenants().then(setData);
		}
	}, [tribes]);

	return (
		<div className="totalTenants">
			Total Tenants: <b>{tenants}</b>
		</div>
	);
};

GetTotalTenants.propTypes = {};

GetTotalTenants.defaultProps = {};
