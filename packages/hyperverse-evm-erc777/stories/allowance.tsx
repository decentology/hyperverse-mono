import * as PropTypes from 'prop-types';
import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';
import './button.css';

export const Allowance = ({ ...props }) => {
	const { allowance } = useERC777();
	const { address, Connect } = useEvm();

	return address ? (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				allowance({});
			}}
		>
			Allowance
		</button>
	) : (
		<Connect />
	);
};

Allowance.propTypes = {};

Allowance.defaultProps = {};
