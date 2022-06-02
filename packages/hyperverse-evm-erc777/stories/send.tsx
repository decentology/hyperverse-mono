import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const Send = ({ ...props }: { to: string; amount: number; data: string }) => {
	const { send } = useERC777();
	const { address, Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					send(props);
				}}
			>
				Send
			</button>
		</>
	);
};
