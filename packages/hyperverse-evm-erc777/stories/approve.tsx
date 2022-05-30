import * as PropTypes from 'prop-types';
import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';

export const Approve = ({ ...props }) => {
	const { approve } = useERC777();
	const { address, Connect } = useEvm();

	return address ? (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				approve({});
			}}
		>
			Approve
		</button>
	) : (
		<Connect />
	);
};

Approve.propTypes = {};

Approve.defaultProps = {};
