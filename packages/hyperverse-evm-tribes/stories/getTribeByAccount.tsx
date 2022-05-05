import * as PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useState, useEffect } from 'react';

export const GetTribeByAccount = ({ ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState(null);

	/**
	 * Error in getTribeId()
	 */
	useEffect(() => {
		console.log('before the if - get tribe by account')
		console.log(props.account)
		if (tribes.getTribeByAccount) {
			tribes.getTribeByAccount(props.account).then(setData);
			console.log('after the if', props.account)
			console.log(data);
		}
	}, [tribes.getTribeByAccount]);

	return (
		<div className="tribeByAccount">
			Tribe: <b>{data}</b>
		</div>
	);
};

GetTribeByAccount.propTypes = {
	account: PropTypes.string.isRequired
};

GetTribeByAccount.defaultProps = {};
