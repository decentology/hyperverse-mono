import React from 'react';
import PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';

/**
 * Primary UI component for user interaction
 */
export const GetTribe = ({ ...props }) => {
	const { Tribe } = useTribes();
	const { address, connect } = useEvm();
	const { data } = Tribe();

	return (
		<div className="tribe">
			Tribe: <b>{data}</b>
		</div>
	);
};

GetTribe.propTypes = {
	id: PropTypes.number.isRequired,
};

GetTribe.defaultProps = {};
