import { useERC20 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const TransferFrom = ({ ...props }: { from: string; to: string; amount: number }) => {
	const { transferFrom } = useERC20();
	const { address, Connect } = useEvm();

	return address ? (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				transferFrom?.(props);
			}}
		>
			Transfer From
		</button>
	) : (
		<Connect />
	);
};
