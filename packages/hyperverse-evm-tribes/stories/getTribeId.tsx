import React from 'react';
import PropTypes from 'prop-types';
import { useTribes } from '../source';
import './button.css';
import { useState, useEffect } from 'react';

export const GetTribeId = ({ ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState(null);

	/**
	 * Error: network does not support ENS
	 * Stuck at contract call? (line 55)
	 */
	useEffect(() => {
		if (tribes.getTribeId) {
			console.log(props.account)
			tribes.getTribeId(props.account).then(setData);
			console.log(props.account)
			console.log('this is the data', data)
		}
	}, [tribes.getTribeId])
	console.log(data)

	return (
		<div className="tribe">
			Tribe Id: <b>{data}</b>
		</div>
	);
};

GetTribeId.propTypes = {
	account: PropTypes.string.isRequired
};

GetTribeId.defaultProps = {};
