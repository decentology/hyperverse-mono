import { useTribes } from '../source';
import { useEffect, useState } from 'react';
import { MetaDataFormatted } from '../source/types';
import './style.css';

export const GetAllTribes = ({ ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState<MetaDataFormatted[] | null>(null);

	useEffect(() => {
		if (tribes.getAllTribes) {
			tribes.getAllTribes().then(setData);
		}
	}, [tribes.getAllTribes]);

	return (
		<div className="tribeMembers">
			<div>All Tribes: </div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
};
