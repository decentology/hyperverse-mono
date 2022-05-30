import * as PropTypes from 'prop-types';
import './style.css';
import { useWhitelist } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';
import { useEffect } from 'react';

export const Register = ({ ...props }) => {
	const whitelist = useWhitelist();
	const { address, connect } = useEvm();

	useEffect(() => {
		return () => {
			whitelist.register().then(mutate);
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
			{address ? 'Register' : 'Connect'}
		</button>
	);
};

Register.propTypes = {};

Register.defaultProps = {};
