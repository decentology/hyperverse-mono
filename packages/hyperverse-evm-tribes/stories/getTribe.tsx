import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTribes } from '../source';
import { MetaDataFormatted } from '../source/types';

export const GetTribe = ({ ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState<MetaDataFormatted | null>(null);
	useEffect(() => {
		if (tribes.getTribe) {
			tribes.getTribe(props.id).then(setData);
		}
	}, [tribes.getTribe]);

	return (
		<div className="tribe">
			Tribe: <b>{data}</b>
		</div>
	);
};

GetTribe.propTypes = {};

GetTribe.defaultProps = {};
