import * as PropTypes from 'prop-types';
import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './button.css';

export const OperatorSend = ({ ...props }) => {
	const { operatorSend } = useERC777();
	const { address, Connect } = useEvm();

	return address ? (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				operatorSend(address);
			}}
		>
			Operator Send
		</button>
	) : (
		<Connect />
	);
};

OperatorSend.propTypes = {};

OperatorSend.defaultProps = {};
