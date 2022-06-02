import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const TransferFrom = ({ ...props }: { from: string; to: string; amount: number }) => {
	const { transferFrom } = useERC777();
	const { address, Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					transferFrom(props);
				}}
			>
				Transfer From
			</button>
		</>
	);
};
