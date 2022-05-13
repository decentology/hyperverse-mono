import * as PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useState, useEffect } from 'react';

export const GetTotalTenants = ({ ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState(null);

	useEffect(() => {
		if(tribes.getTotalTenants){
			tribes.getTotalTenants().then(setData);
		}
	}, [tribes]);

	return (
		<div className="totalTenants">
			Total Tenants: <b>{data}</b>
		</div>
	);
};

GetTotalTenants.propTypes = {};

GetTotalTenants.defaultProps = {};
