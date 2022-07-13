import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const RevokeOperator = ({ ...props }: { operator: string }) => {
	const { revokeOperator } = useERC777();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					revokeOperator?.(props.operator);
				}}
			>
				Revoke Operator
			</button>
		</>
	);
};
