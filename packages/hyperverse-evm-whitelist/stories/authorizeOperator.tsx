import { useWhitelist } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const AuthorizeOperator = ({ ...props }: { operator: string }) => {
	const { authorizeOperator } = useWhitelist();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					authorizeOperator(props.operator);
				}}
			>
				Authorize Operator
			</button>
		</>
	);
};
