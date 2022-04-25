import * as PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useState, useEffect } from 'react';

export const GetTotalTenants = ({ ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState(null);

	const updateData = () => {
		setData(data);
	};

	useEffect(() => {
		return () => {
			tribes.getTotalTenants().then(updateData);
		};
	}, []);

	return (
		<div className="totalTenants">
			Total Tenants: <b>{data}</b>
		</div>
	);
};

GetTotalTenants.propTypes = {};

GetTotalTenants.defaultProps = {};
