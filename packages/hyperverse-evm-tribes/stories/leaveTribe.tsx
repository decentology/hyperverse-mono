import React from 'react';
import PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';

export const LeaveTribe = ({ ...props }) => {
	const tribes = useTribes();
	const { address } = useEvm();
	// const { mutate } = Leave();

	return (
		<div>
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					// mutate();
				}}
			>
				Leave Tribe: Knight
			</button>
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'green' }}
				onClick={() => {
					// mutate();
				}}
			>
				Leave Tribe: Mage
			</button>
		</div>
	);
};

LeaveTribe.propTypes = {};

LeaveTribe.defaultProps = {};
