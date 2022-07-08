import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/react';
import './style.css';

export const TogglePublicMint = ({ ...props }) => {
	const { initializeCollection } = useERC721();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					initializeCollection!({
						price: .005,
						maxSupply: 10000,
						maxPerUser: 10000
					});
				}}
			>
				Public Mint
			</button>
		</>
	);
};
