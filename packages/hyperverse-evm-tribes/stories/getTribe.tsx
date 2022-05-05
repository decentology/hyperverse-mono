import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTribes } from '../source';
import { MetaDataFormatted } from '../source/types';

export const GetTribe = ({ ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState(null);

	useEffect(() => {
		console.log(props.id)
		if (tribes.getTribe) {
			console.log('in the if')
			tribes.getTribe(props.id).then(setData);
			console.log('props', props.id);
			console.log('data', data);
		}
	}, [tribes.getTribe]);

	return (
		<div className="tribe">
			Tribe: <b>{data}</b>
		</div>
	);
};

GetTribe.propTypes = {
	id: PropTypes.number.isRequired,
};

GetTribe.defaultProps = {};
