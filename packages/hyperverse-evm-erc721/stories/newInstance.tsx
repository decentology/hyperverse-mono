import * as PropTypes from 'prop-types';
import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './button.css';

export const NewInstance = ({ ...props }) => {
	const { createInstance, error } = useERC721();
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
						createInstance({account: address});
					}}
				>
					New Instance
				</button>
			) : (
				<Connect />
			)}
		</>
	);
};

NewInstance.propTypes = {};

NewInstance.defaultProps = {};
