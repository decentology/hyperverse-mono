import * as PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useState, useEffect } from 'react';

export const GetAllTribes = ({ ...props }) => {
	const { getAllTribes } = useTribes();
	const [data, setData] = useState(null);

	useEffect(() => {
		try {
			getAllTribes(props.tenantId).then(setData);
		} catch (err) {
			console.log(err);
		}
		getAllTribes(props.tenantId);
	}, []);

	return (
		<div className="allTribes">
			All Tribes: <b>{data}</b>
		</div>
	);
};

GetAllTribes.propTypes = {
	tenantId: PropTypes.string.isRequired,
};

GetAllTribes.defaultProps = {};
