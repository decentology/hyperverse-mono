import * as PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useEffect, useState } from 'react';

export const GetTotalTenants = ({ tenants, ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState(tenants);

	useEffect(() => {
		if (tribes.getTotalTenants) {
			tribes.getTotalTenants().then(setData);
		}
	}, [tribes.getTotalTenants]);

	const hasTenants = () => {
		return data ? (
			<p>{data}</p>
		) : (
			<p>There are no tenants. Please create an instance.</p>
		);
	};

	return <div className="totalTenants"> Total Tenants: {hasTenants()}</div>;
};

GetTotalTenants.propTypes = {};

GetTotalTenants.defaultProps = {};
