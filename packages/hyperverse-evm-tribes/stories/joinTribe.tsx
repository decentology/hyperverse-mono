import React from 'react';
import PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';

export const JoinTribe = ({ ...props }) => {
	const tribes = useTribes();
	const { address, connect } = useEvm();
	// const { mutate } = Join();

	return (
		<div>
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					// mutate({ id: 1 });
				}}
			>
				Join Tribe: Knight
			</button>
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'green' }}
				onClick={() => {
					// mutate({ id: 2 });
				}}
			>
				Join Tribe: Mage
			</button>
		</div>
	);
};

JoinTribe.propTypes = {
	knightId: PropTypes.number.isRequired,
	mageId: PropTypes.number.isRequired,
};

JoinTribe.defaultProps = {};
