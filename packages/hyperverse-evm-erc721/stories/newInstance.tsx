import { useERC721 } from '../source/';
import { useEvm } from '@decentology/hyperverse-evm/react';
import './style.css';

export const NewInstance = ({ ...props }) => {
	const { createInstance } = useERC721();
	const { address, Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					createInstance!({ account: address!, name: 'TEST', symbol:'TST' });
				}}
			>
				New Instance
			</button>
		</>
	);
};
