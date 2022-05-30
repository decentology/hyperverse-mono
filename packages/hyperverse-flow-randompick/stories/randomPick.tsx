import * as PropTypes from 'prop-types';
import { useRandomPick } from '../source';
import { useState, useEffect } from 'react';
import './style.css';

export const RandomPick = ({ ...props }) => {
	const { getRandomPick } = useRandomPick();
	const [data, setData] = useState([]);

	useEffect(() => {
		try {
			getRandomPick(props.values).then(setData);
		} catch (err) {
			console.log(err);
		}
		getRandomPick(props.values);
	}, []);

	return (
		<div className="pick">
			Random Pick: <b>{data}</b>
		</div>
	);
};

RandomPick.propTypes = {
	values: PropTypes.array.isRequired,
};

RandomPick.defaultProps = {};
