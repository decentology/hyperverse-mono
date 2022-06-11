import * as PropTypes from 'prop-types';
import './style.css';
import { useWhitelist } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';
import { useState, useEffect } from 'react';

export const CreateWhitelist = ({ ...props }) => {
	const whitelist = useWhitelist();
	const { address, connect } = useEvm();

	useEffect(() => {
		return () => {
			whitelist.createWhitelist().then(mutate);
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
			{address ? 'Create Whitelist' : 'Connect'}
		</button>
	);
};

CreateWhitelist.propTypes = {};

CreateWhitelist.defaultProps = {};
