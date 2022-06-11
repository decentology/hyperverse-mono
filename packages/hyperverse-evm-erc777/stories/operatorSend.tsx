import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const OperatorSend = ({
	...props
}: {
	sender: string;
	recipient: string;
	amount: number;
	data: string;
	operatorData: string;
}) => {
	const { operatorSend } = useERC777();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					operatorSend(props);
				}}
			>
				Operator Send
			</button>
		</>
	);
};
