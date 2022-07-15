import { useNFTGame } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm/react';
import './style.css';

export const SetApprovalForAll = ({ ...props }: { operator: string; approved: boolean }) => {
	const { setApprovalForAll } = useNFTGame();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					setApprovalForAll!(props);
				}}
			>
				Set Approval for All
			</button>
		</>
	);
};
