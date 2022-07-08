import { useTribes } from '../source';
import { useState, useEffect } from 'react';

export const GetCurrentTribe = ({ ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (tribes.getCurrentTribe) {
			tribes.getCurrentTribe().then(setData);
		}
	}, [tribes.getCurrentTribe]);

	return (
		<div className="body">
			Current Tribe: <b>{JSON.stringify(data)}</b>
		</div>
	);
};
