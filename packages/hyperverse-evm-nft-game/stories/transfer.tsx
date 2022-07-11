import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const Transfer = ({ ...props }: { from: string; to: string; tokenId: number }) => {
	const { transfer } = useERC721();
	const { address, Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					transfer(props);
				}}
			>
				Transfer
			</button>
		</>
	);
};
