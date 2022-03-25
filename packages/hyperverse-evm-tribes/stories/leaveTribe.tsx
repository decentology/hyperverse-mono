import React from 'react';
import PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';

/**
 * Primary UI component for user interaction
 */
export const LeaveTribe = ({ ...props }) => {
	const { Leave } = useTribes();
	const { address, connect } = useEvm();
	const { data } = Leave();

	return (
		<div className="tribe">
			Tribe: <b>{data}</b>
		</div>
	);
};

LeaveTribe.propTypes = {
};

LeaveTribe.defaultProps = {};
