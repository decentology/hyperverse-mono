import { useERC721 } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm/react';
import './style.css';

export const ApproveAll = ({ ...props }: { operator: string; approved: boolean }) => {
	const { setApprovalForAll } = useERC721();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					setApprovalForAll?.(props);
				}}
			>
				Approve All
			</button>
		</>
	);
};
