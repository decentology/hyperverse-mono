import { useNFTGame } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const SetMintPermissions = ({ ...props }: { isPublic: boolean }) => {
	const { setMintPermissions } = useNFTGame();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					setMintPermissions!(props.isPublic);
				}}
			>
				Public Mint
			</button>
		</>
	);
};
