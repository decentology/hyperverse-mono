import React from 'react';
import PropTypes from 'prop-types';
import { useTribes } from '../source';

export const GetTribeMembers = ({ ...props }) => {
	const { TribeMembers } = useTribes();
	const { data: tribeMembers } = TribeMembers(1);
	console.log('Tribe Members:', tribeMembers);

	return (
		<div className="tribeMembers">
			Tribe Members: <b>{tribeMembers}</b>
		</div>
	);
};

GetTribeMembers.propTypes = {
	tribeId: PropTypes.number.isRequired,
};

GetTribeMembers.defaultProps = {};
