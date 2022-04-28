import * as PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useState, useEffect } from 'react';

export const GetTribeByAccount = ({ ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState(null);

	useEffect(() => {
		return () => {
			tribes.getTribeByAccount('').then(setData); // Need to pass an account
		};
	}, []);

	return (
		<div className="tribeByAccount">
			Tribe: <b>{data}</b>
		</div>
	);
};

GetTribeByAccount.propTypes = {};

GetTribeByAccount.defaultProps = {};
