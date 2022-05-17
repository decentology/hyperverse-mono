import PropTypes from 'prop-types';
import { useTribes } from '../source';
import React, { useEffect, useState } from 'react';

export const GetTribe = ({ ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (tribes.getTribe) {
			tribes.getTribe(props.tribeId).then(setData);
		}
	}, [tribes.getTribe]);

	return (
		<div className="tribe">
			<div> Tribe: </div>
			<pre>{JSON.stringify(data)}</pre>
		</div>
	);
};

GetTribe.propTypes = {
	tribeId: PropTypes.number.isRequired,
};

GetTribe.defaultProps = {};
