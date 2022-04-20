import React from 'react';
import PropTypes from 'prop-types';
import { useTribes } from '../source';
import './button.css';
import { useEvm } from '@decentology/hyperverse-evm/source';

export const GetTribeId = ({ ...props }) => {
	const { TribeId } = useTribes();
	const { address, connect } = useEvm();
	const { data: tribeId } = TribeId();

	return (
		<div className="totalTenants">
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					if (address) {
						{tribeId}
					} else {
						connect();
					}
				}}
			>
				{'Connect'}
			</button>
			Tribe ID: <b>{tribeId}</b>
		</div>
	);
};

GetTribeId.propTypes = {
	account: PropTypes.string.isRequired,
};

GetTribeId.defaultProps = {};
