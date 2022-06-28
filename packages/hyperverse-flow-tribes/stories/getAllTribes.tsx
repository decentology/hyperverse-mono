import { useTribes } from '../source';
import { useState, useEffect } from 'react';

export const GetAllTribes = ({ ...props }: { tenantId: number }) => {
	const tribes = useTribes();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (tribes.getAllTribes) {
			tribes.getAllTribes(props.tenantId).then(setData);
		}
	}, [tribes.getAllTribes]);

	return (
		<div className="body">
			All Tribes: <b>{JSON.stringify(data)}</b>
		</div>
	);
};
