import * as PropTypes from 'prop-types';
import './style.css';
import { useTribes } from '../source';
import { useState, useEffect } from 'react';

export const GetCurrentTribe = ({ ...props }) => {
	const { getCurrentTribe } = useTribes();
	const [data, setData] = useState(null);

	useEffect(() => {
		try {
			getCurrentTribe(props.tenantId, props.accountAddress).then(setData);
		} catch (err) {
			console.log(err);
		}
		getCurrentTribe(props.tenantId, props.accountAddress);
	}, []);

	return (
        <div className="currentTribe">
            Current Tribe: <b>{data}</b>
        </div>
);
};

GetCurrentTribe.propTypes = {
    tenantId: PropTypes.string.isRequired,
    accountAddress: PropTypes.string.isRequired
};

GetCurrentTribe.defaultProps = {};
