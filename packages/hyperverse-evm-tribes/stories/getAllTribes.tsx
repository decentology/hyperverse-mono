import * as PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useEffect, useState } from 'react';
import { MetaDataFormatted } from '../source/types';
import './button.css';

export const GetAllTribes = ({ ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState<MetaDataFormatted[] | null>(null);

	useEffect(() => {
		if (tribes.getAllTribes) {
			tribes.getAllTribes().then(setData);
		}
	}, [tribes.getAllTribes]);

	return (
		<div className="tribes">
			<div>All Tribes: </div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
};

GetAllTribes.propTypes = {};

GetAllTribes.defaultProps = {};
