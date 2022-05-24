import React from 'react';
import PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useState, useEffect } from 'react';

export const GetTribeMembers = ({ ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState([]);

	useEffect(() => {
		if (tribes.getTribeMembers) {
			tribes.getTribeMembers(props.tribeId).then(setData);
		}
	}, [tribes.getTribeMembers]);

	const hasTribeMembers = () => {
		return data.length > 0 ? (
			<pre>Tribe Members: {JSON.stringify(data)}</pre>
		) : (
			<p>There are no members in this tribe.</p>
		);
	};

	return <div className="tribeMembers"> {hasTribeMembers()}</div>;
};

GetTribeMembers.propTypes = {
	tribeId: PropTypes.number.isRequired,
};

GetTribeMembers.defaultProps = {};
