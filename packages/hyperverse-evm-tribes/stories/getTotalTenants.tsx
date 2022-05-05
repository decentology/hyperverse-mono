import * as PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useState, useEffect } from 'react';

export const GetTotalTenants = ({ tenants, ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState(tenants);

	useEffect(() => {
		return () => {
			tribes.getTotalTenants().then(setData)
			console.log(data)
		};
	}, []);
	console.log(data)

	return (
		<div className="totalTenants">
			Total Tenants: <b>{tenants}</b>
		</div>
	);
};

GetTotalTenants.propTypes = {};

GetTotalTenants.defaultProps = {};
