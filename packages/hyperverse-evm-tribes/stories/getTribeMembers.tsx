import React from 'react';
import PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';

/**
 * Primary UI component for user interaction
 */
export const GetTribeMembers = ({ ...props }) => {
	const { TribeMembers } = useTribes();
	const { address, connect } = useEvm();
	const { data } = TribeMembers();

	return (
		<div className="tribeMembers">
			Tribe Members: <b>{data}</b>
		</div>
	);
};

GetTribeMembers.propTypes = {
	tribeId: PropTypes.number.isRequired,
};

GetTribeMembers.defaultProps = {};
