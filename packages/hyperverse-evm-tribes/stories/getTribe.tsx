import { useTribes } from '../source';
import React, { useEffect, useState } from 'react';
import { MetaDataFormatted } from '../source/types';

export const GetTribe = ({ ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState<MetaDataFormatted | null>(null);

	useEffect(() => {
		if (tribes.getTribe) {
			tribes.getTribe(props.tribeId).then(setData);
		}
	}, [tribes.getTribe]);

	const hasTribes = () => {
		return data ? <pre>{JSON.stringify(data)}</pre> : <p>Please add a tribe.</p>;
	};

	return <div className="body"> Tribe: {hasTribes()}</div>;
};
