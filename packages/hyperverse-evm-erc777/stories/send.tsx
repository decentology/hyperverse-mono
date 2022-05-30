import * as PropTypes from 'prop-types';
import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';
import './style.css';

export const Send = ({ ...props }) => {
	const { Send } = useERC777();
	const { address } = useEvm();
	const { mutate } = Send();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				mutate({ sender: '', recipient: '', value: 10, data: '', operatorData: '' });
			}}
		>
			Send
		</button>
	);
};

Send.propTypes = {
	sender: PropTypes.string.isRequired,
	recipient: PropTypes.string.isRequired,
	value: PropTypes.number.isRequired,
	data: PropTypes.string.isRequired,
	operatorData: PropTypes.string.isRequired,
};

Send.defaultProps = {};
