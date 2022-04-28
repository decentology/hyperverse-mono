import React from 'react';
import PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';
import { useState, useEffect } from 'react';

export const LeaveTribe = ({ ...props }) => {
	const tribes = useTribes();
	const { address } = useEvm();

	return (
		<div>
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					tribes.leaveTribe();
				}}
			>
				Leave Tribe: Knight
			</button>
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'green' }}
				onClick={() => {
					tribes.leaveTribe();
				}}
			>
				Leave Tribe: Mage
			</button>
		</div>
	);
};

LeaveTribe.propTypes = {};

LeaveTribe.defaultProps = {};
