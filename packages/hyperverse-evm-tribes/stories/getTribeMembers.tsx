import React from 'react';
import { useTribes } from '../source';
import { useState, useEffect } from 'react';

export const GetTribeMembers = ({ ...props }: { tribeId: number }) => {
	const tribes = useTribes();
	const [data, setData] = useState<({ tribeId: any; account: any } | undefined)[] | undefined>();

	useEffect(() => {
		if (tribes.getTribeMembers) {
			tribes.getTribeMembers(props.tribeId).then(setData);
		}
	}, [tribes.getTribeMembers]);

	const hasTribeMembers = () => {
		return data ? <p> Tribe Members: {data}</p> : <p>{JSON.stringify(tribes.error)}</p>;
	};

	return <div className="body"> {hasTribeMembers()}</div>;
};
