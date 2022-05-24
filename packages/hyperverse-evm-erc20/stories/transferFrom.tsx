import * as PropTypes from 'prop-types';
import { useERC20 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './button.css';

export const TransferFrom = ({ ...props }) => {
	const { transferFrom } = useERC20();
	const { address, Connect } = useEvm();

	return address ? (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				transferFrom({});
			}}
		>
			Transfer NFT From
		</button>
	) : (
		<Connect />
	);
};

TransferFrom.propTypes = {
	from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
};

TransferFrom.defaultProps = {};
