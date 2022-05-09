import * as PropTypes from 'prop-types';
import './button.css';
import { useTribes } from '../source';
import { useState, useEffect } from 'react';

export const GetAllTribes = ({ tenantId, ...props }) => {
	const { getAllTribes } = useTribes();
    const { allTribes } = getAllTribes();
    const [data, setData] = useState(null)
    console.log(props.tenantId)

    useEffect(() => {
        console.log('before try', props.tenantId)
        try {
            if(allTribes) {
                allTribes(props.tenantId).then(setData)
            }
        } catch (err) {
            throw err;
            console.log(err);
        }
        console.log('after try catch', props.tenantId)
    }, [])

	return (
        <div className="allTribes">
            All Tribes: <b>{data}</b>
        </div>
);
};

GetAllTribes.propTypes = {
    tenantId: PropTypes.string.isRequired
};

GetAllTribes.defaultProps = {};
