import React from 'react';
import PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';

/**
 * Primary UI component for user interaction
 */
export const JoinTribe = ({ ...props }) => {
	const { Join } = useTribes();
	const { address, connect } = useEvm();
	const { data } = Join();

	return (
		<div className="tribeJoined">
			You joined the Tribe: <b>{data}</b>
		</div>
	);
};

JoinTribe.propTypes = {
	id: PropTypes.number.isRequired,
};

JoinTribe.defaultProps = {};
