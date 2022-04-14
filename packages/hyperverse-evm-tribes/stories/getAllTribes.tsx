import * as PropTypes from 'prop-types';
import './button.css';
import { useTribes } from '../source';

export const GetAllTribes = ({ ...props }) => {
	const { Tribes } = useTribes();
	const { data: tribes } = Tribes();
	console.log(tribes);

	return (
		<div className="tribes">
			All Tribes: <b>{tribes}</b>
		</div>
	);
};

GetAllTribes.propTypes = {};

GetAllTribes.defaultProps = {};
