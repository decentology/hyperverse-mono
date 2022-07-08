import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useState, useEffect } from 'react';
import { MetaDataFormatted } from '../source/types';

export const GetTribeByAccount = ({ ...props }: {address: string}) => {
	const tribes = useTribes();
	const { address } = useEvm();
	const [data, setData] = useState<MetaDataFormatted | null>(null);

	useEffect(() => {
		if (tribes.getTribeByAccount) {
			tribes.getTribeByAccount(props.address).then(setData);
		}
	}, [tribes.getTribeByAccount]);
	console.log(address)

	const tribeOfAccount = () => {
		return data ? (
			<pre>Tribe: {JSON.stringify(data)}</pre>
		) : (
			<p>This account is not in a tribe!</p>
		);
	};

	return <div className="body"> {tribeOfAccount()}</div>;
};