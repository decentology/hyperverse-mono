import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';

export const Approve = ({ ...props }: {spender: string, amount: number}) => {
	const { approve } = useERC777();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					approve(props);
				}}
			>
				Approve
			</button>
		</>
	);
};
