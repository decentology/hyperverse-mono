import { useTribes } from '../source';
import React, { useEffect, useState } from 'react';

export const GetTribe = ({ ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (tribes.getTribe) {
			tribes.getTribe(props.tribeId).then(setData);
		}
	}, [tribes.getTribe]);

	const hasTribes = () => {
		return data ? (
			<pre>{JSON.stringify(data)}</pre>
		) : (
			<p>Please add a tribe.</p>
		);
	};

	return <div className="totalTenants"> Tribe: {hasTribes()}</div>;
};
