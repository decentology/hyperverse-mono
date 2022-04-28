import * as PropTypes from 'prop-types';
import './button.css';
import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';
import { useState, useEffect } from 'react';

export const NewInstance = ({ ...props }) => {
	const tribes = useTribes();
	const { address, connect } = useEvm();

	useEffect(() => {
		return () => {
			tribes.newInstance().then(mutate);
		};
	}, []);

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				console.log('Calling mutate');
				if (address) {
					mutate({ account: address });
				} else {
					connect();
				}
			}}
		>
			{address ? 'New Instance' : 'Connect'}
		</button>
	);
};

NewInstance.propTypes = {
	account: PropTypes.string.isRequired,
};

NewInstance.defaultProps = {};
