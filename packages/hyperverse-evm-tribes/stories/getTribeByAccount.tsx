import * as PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useState, useEffect } from 'react';

export const GetTribeByAccount = ({ ...props }) => {
	const tribes = useTribes();
	const { address } = useEvm();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (tribes.getTribeByAccount) {
			tribes.getTribeByAccount(address).then(setData);
		}
	}, [tribes.getTribeByAccount]);

	const tribeOfAccount = () => {
		return data ? (
			<pre>Tribe: {JSON.stringify(data)}</pre>
		) : (
			<p>This account is not in a tribe!</p>
		);
	};

	return <div className="tribeMembers"> {tribeOfAccount()}</div>;
};

GetTribeByAccount.propTypes = {};

GetTribeByAccount.defaultProps = {};
