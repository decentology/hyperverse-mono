import * as PropTypes from 'prop-types';
import './style.css';
import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';

export const Transfer = ({ ...props }) => {
	const { Transfer } = useERC721();
	const { address } = useEvm();
	const { mutate } = Transfer();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
					mutate({ from: address, to: address, tokenId: 123 });
			}}
		>
			Transfer
		</button>
	);
};

Transfer.propTypes = {
	from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    tokenId: PropTypes.number.isRequired
};

Transfer.defaultProps = {};
