import * as PropTypes from 'prop-types';
import './button.css';
import { useTribes } from '../source';

export const GetCurrentTribe = ({ ...props }) => {
	const { getCurrentTribe } = useTribes();
    const { allTribes } = getCurrentTribe();

	return (
        <div className="currentTribe">
            Current Tribe: <b>{allTribes}</b>
        </div>
);
};

GetCurrentTribe.propTypes = {
    tenantId: PropTypes.string.isRequired,
    accountAddress: PropTypes.string.isRequired
};

GetCurrentTribe.defaultProps = {};
