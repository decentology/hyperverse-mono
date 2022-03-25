import React from 'react';
import PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';

export const GetTribeId = ({ ...props }) => {
	const { TribeId } = useTribes();
	const { address, connect } = useEvm();
	const { data } = TribeId();

	return (
		<div className="tribeId">
			TribeId: <b>{data}</b>
		</div>
	);
};

GetTribeId.propTypes = {
	account: PropTypes.string.isRequired,
};

GetTribeId.defaultProps = {};
