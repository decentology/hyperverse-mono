import * as PropTypes from 'prop-types';
import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './button.css';

export const MintNFT = ({ ...props }) => {
	const { mint, error } = useERC721();
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
						mint(props.to);
					}}
				>
					Mint NFT
				</button>
			) : (
				<Connect />
			)}
		</>
	);
};

MintNFT.propTypes = {
	to: PropTypes.string.isRequired
};

MintNFT.defaultProps = {};
