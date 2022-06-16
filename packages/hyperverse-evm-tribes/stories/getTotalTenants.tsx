import { useTribes } from '../source';
import { useEffect, useState } from 'react';

export const GetTotalTenants = ({ ...props }: {tenants: number}) => {
	const tribes = useTribes();
	const [data, setData] = useState(props.tenants);

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

	return <div className="body"> Total Tenants: {hasTenants()}</div>;
};
