import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const Burn = ({ ...props }: {amount: number, data: string}) => {
	const { burn } = useERC777();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					burn?.(props);
				}}
			>
				Burn Tokens
			</button>
		</>
	);
};
