import { useNFTGame } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const SetDynamicAttributes = ({ ...props }: { tokenId: number; attributes: number[] }) => {
	const { setDynamicAttributes } = useNFTGame();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					setDynamicAttributes!(props.tokenId, props.attributes);
				}}
			>
				Set Dynamic Attributes
			</button>
		</>
	);
};
