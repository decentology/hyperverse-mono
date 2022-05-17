import * as PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useEffect, useState } from 'react';

export const GetTotalTenants = ({ tenants, ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState(tenants);

	useEffect(() => {
		if(tribes.getTotalTenants){
			tribes.getTotalTenants().then(setData);
		}
	}, [tribes.getTotalTenants]);

	return (
		<div className="totalTenants">
			<div>Total Tenants: </div>
			<pre>{data}</pre>
		</div>
	);
};

GetTotalTenants.propTypes = {};

GetTotalTenants.defaultProps = {};
