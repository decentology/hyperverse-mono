import React from 'react';
import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const GetTribeId = ({ account, ...props }) => {
	const tribes = useTribes();
	const { address } = useEvm();
	const [data, setData] = useState(account);

	useEffect(() => {
		if (tribes.getTribeId) {
			tribes.getTribeId(address).then(setData);
		}
	}, [tribes.getTribeId]);

	const hasTribeId = () => {
		return data ? (
			<p>Tribe id: {data}</p>
		) : (
			<p>This account is not in a tribe!</p>
		);
	};

	return <div className="tribeId"> {hasTribeId()}</div>;
};