import { useERC20 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const Burn = ({ ...props }: { amount: number }) => {
	const { burn } = useERC20();
	const { address, Connect } = useEvm();

	return address ? (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				burn?.(props.amount);
			}}
		>
			Burn
		</button>
	) : (
		<Connect />
	);
};
