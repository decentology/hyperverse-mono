import * as PropTypes from 'prop-types';
import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';
import './style.css';

export const OperatorSend = ({ ...props }) => {
	const { OperatorSend } = useERC777();
	const { address } = useEvm();
	const { mutate } = OperatorSend();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				mutate({ sender: '', recipient: '', value: 10, data: '', operatorData: '' });
			}}
		>
			Operator Send
		</button>
	);
};

OperatorSend.propTypes = {
	sender: PropTypes.string.isRequired,
	recipient: PropTypes.string.isRequired,
	value: PropTypes.number.isRequired,
	data: PropTypes.string.isRequired,
	operatorData: PropTypes.string.isRequired,
};

OperatorSend.defaultProps = {};
