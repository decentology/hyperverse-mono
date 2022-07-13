import { useNFTGame } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const SetBaseURI = ({ ...props }: { baseURI: string }) => {
	const { setBaseURI } = useNFTGame();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					setBaseURI!(props.baseURI);
				}}
			>
				Set Base URI
			</button>
		</>
	);
};
