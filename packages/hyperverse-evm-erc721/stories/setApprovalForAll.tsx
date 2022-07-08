import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/react';
import './style.css';

export const ApproveAll = ({ ...props }: { to: string; approved: boolean }) => {
	const { setApprovalForAll } = useERC721();
	const { address, Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					setApprovalForAll!({
						approved: props.approved,
						operator: props.to
					});
				}}
			>
				Approve All
			</button>
		</>
	);
};
