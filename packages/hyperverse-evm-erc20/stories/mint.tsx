import { useERC20 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const Mint = ({ ...props }: { amount: number }) => {
	const { mint } = useERC20();
	const { address, Connect } = useEvm();

	return address ? (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				mint?.(props.amount);
			}}
		>
			Mint
		</button>
	) : (
		<Connect />
	);
};
