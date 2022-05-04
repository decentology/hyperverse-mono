import React from 'react';
import PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useState, useEffect } from 'react'

export const GetTribe = ({ ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState(null);
	useEffect(() => {
		return () => {
			tribes.getTribe().then(setData);
		};
	}, [])

	return (
		<div className="tribe">
			Tribe: <b>{data}</b>
		</div>
	);
};

GetTribe.propTypes = {};

GetTribe.defaultProps = {};
