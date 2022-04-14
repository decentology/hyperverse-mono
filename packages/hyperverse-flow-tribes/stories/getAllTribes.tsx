import * as PropTypes from 'prop-types';
import './button.css';
import { useTribes } from '../source';

export const GetAllTribes = ({ ...props }) => {
	const { getAllTribes } = useTribes();
    const { allTribes } = getAllTribes();

	return (
        <div className="allTribes">
            All Tribes: <b>{allTribes}</b>
        </div>
);
};

GetAllTribes.propTypes = {
    tenantId: PropTypes.string.isRequired
};

GetAllTribes.defaultProps = {};
