import React from 'react';
import PropTypes from 'prop-types';
import { useTribes } from '../source';

export const GetTribe = ({ ...props }) => {
	const { Tribe } = useTribes();
	const { data: tribeData } = Tribe();
	console.log(props.id, tribeData);

	return (
		<div className="tribe">
			Tribe: <b>{tribeData}</b>
		</div>
	);
};

GetTribe.propTypes = {
	id: PropTypes.number.isRequired,
};

GetTribe.defaultProps = {};
