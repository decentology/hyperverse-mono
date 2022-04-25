import React from 'react';
import PropTypes from 'prop-types';
import { useTribes } from '../source';
import './button.css';
import { useState, useEffect } from 'react';

export const GetTribeId = ({ ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState(null);
	useEffect(() => {
		return () => {
			tribes.getTribeId().then(setData);
		};
	}, [])

	return (
		<div className="tribe">
			Tribe Id: <b>{data}</b>
		</div>
	);
};

GetTribeId.propTypes = {
	account: PropTypes.string.isRequired,
};

GetTribeId.defaultProps = {};
