import { useERC20 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const Approve = ({ ...props }: { spender: string; amount: number }) => {
	const { approve } = useERC20();
	const { address, Connect } = useEvm();

	return address ? (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				approve?.(props);
			}}
		>
			Approve
		</button>
	) : (
		<Connect />
	);
};
