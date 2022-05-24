import * as PropTypes from 'prop-types';
import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';
import './button.css';

export const Transfer = ({ ...props }) => {
	const { transfer, error } = useERC721();
	const { address, Connect } = useEvm();

	return error != null ? (
		<div>Error</div>
	) : (
		<>
			{address ? (
				<button
					type="button"
					className={['storybook-button', `storybook-button--large`].join(' ')}
					style={{ color: 'blue' }}
					onClick={() => {
						transfer({from: address, to: '', tokenId: 123});
					}}
				>
					Transfer
				</button>
			) : (
				<Connect />
			)}
		</>
	);
};

Transfer.propTypes = {};

Transfer.defaultProps = {};
