import React from 'react';
import PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useState, useEffect } from 'react';

export const GetTribeMembers = ({ ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState(null);
	useEffect(() => {
		return () => {
			tribes.getTribeMembers(5).then(setData);
		};
	}, []);

	return (
		<div className="tribeMembers">
			Tribe Members: <b>{data}</b>
		</div>
	);
};

GetTribeMembers.propTypes = {};

GetTribeMembers.defaultProps = {};
