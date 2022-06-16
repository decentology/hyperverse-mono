import React from 'react';
import { useTribes } from '../source';
import { useState, useEffect } from 'react';

export const GetTribeMembers = ({ ...props }: { tribeId: number }) => {
	const tribes = useTribes();
	const [data, setData] = useState();
	const [error, setError] = useState<
		({ tribeId: any; account: any } | undefined)[] | undefined
	>();

	useEffect(() => {
		if (tribes.getTribeMembers) {
			tribes.getTribeMembers(props.tribeId).then(setData, (error) => setError(error));
		}
	}, [tribes.getTribeMembers]);
	console.log(error);

	const hasTribeMembers = () => {
		if (error) {
			return (
				<div role="alert">
					<pre style={{ whiteSpace: 'normal' }}>{JSON.stringify(error)}</pre>
				</div>
			);
		}
		return <p> Tribe Members: {JSON.stringify(tribes.error)}</p>;
	};

	return <div className="body"> {hasTribeMembers()}</div>;
};
