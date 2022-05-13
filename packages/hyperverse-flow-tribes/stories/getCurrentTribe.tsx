import * as PropTypes from 'prop-types';
import './button.css';
import { useTribes } from '../source';

export const GetCurrentTribe = ({ tenantId, accountAddress, ...props }) => {
    console.log('this is the tenant Id', tenantId)
    console.log('this is the account address', accountAddress)
	const { getCurrentTribe } = useTribes();
    const { allTribes } = getCurrentTribe(tenantId, accountAddress);

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
