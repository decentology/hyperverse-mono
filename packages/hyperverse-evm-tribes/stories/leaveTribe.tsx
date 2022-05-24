import PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';

export const LeaveTribe = ({ ...props }) => {
	const { leaveTribe, error } = useTribes();
	const { address, Connect } = useEvm();
	console.log('address', address);

	const tribeLeave = () => {
		if (leaveTribe()) {
			leaveTribe();
		}
	};

	return address ? (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={tribeLeave}
		>
			Leave Tribe
		</button>
	) : (
		<Connect />
	);
};

LeaveTribe.propTypes = {};

LeaveTribe.defaultProps = {};
