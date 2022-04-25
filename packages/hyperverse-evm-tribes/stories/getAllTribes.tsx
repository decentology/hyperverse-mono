import * as PropTypes from 'prop-types';
import './button.css';
import { useTribes } from '../source';
import { useEffect, useState } from 'react';

export const GetAllTribes = ({ ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState(null);
	useEffect(() => {
		tribes.getAllTribes().then(setData);
	}, []);

	return (
		<div className="tribes">
			All Tribes: <b>{data}</b>
		</div>
	);
};

GetAllTribes.propTypes = {};

GetAllTribes.defaultProps = {};
