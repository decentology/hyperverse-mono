import React from 'react';
import PropTypes from 'prop-types';
import './button.css';
import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';

/**
 * Primary UI component for user interaction
 */
export const GetTotalTenants = ({ ...props }) => {
	const { TotalTenants } = useTribes();
	const { address, connect } = useEvm();
	const { data } = TotalTenants();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
		>
			{data}
		</button>
	);
};

GetTotalTenants.propTypes = {
	/**
	 * Is this the principal call to action on the page?
	 */
	/**
	 * Optional click handler
	 */
};

GetTotalTenants.defaultProps = {};
