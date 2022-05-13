import * as PropTypes from 'prop-types';
import './button.css';
import { useTribes } from '../source';
import { useEffect, useState } from 'react';
import { MetaDataFormatted } from '../source/types';
import { Styles } from './formStyles';

export const GetAllTribes = ({ tribeOne, tribeTwo, ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState<MetaDataFormatted[] | null>(null);
	// const [data, setData] = useState(tribeOne);

	useEffect(() => {
		if (tribes.getAllTribes) {
			tribes.getAllTribes().then(setData);
			console.log(data);
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
