import * as PropTypes from 'prop-types';
import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './button.css';

export const Transfer = ({ ...props }) => {
	const { transfer } = useERC777();
	const { address, Connect } = useEvm();

	return address ? (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				transfer(address);
			}}
		>
			Transfer
		</button>
	) : (
		<Connect />
	);
};

Transfer.propTypes = {};

Transfer.defaultProps = {};
