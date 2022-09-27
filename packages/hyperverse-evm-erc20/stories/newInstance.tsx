import React from 'react';
import { useERC20 } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm/react';
import './style.css';

export const NewInstance = ({ ...props }) => {
	const { createInstance } = useERC20();
	const { address, Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					createInstance?.({
						account: address!,
						name: 'TEST',
						symbol: 'TST',
						decimal: 10,
					});
				}}
			>
				New Instance
			</button>
		</>
	);
};
