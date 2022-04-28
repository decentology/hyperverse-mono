import * as PropTypes from 'prop-types';
import { useTribes } from '../source';
import './button.css';

export const LeaveTribe = ({ ...props }) => {
	const { leaveTribe } = useTribes();
	const { } = leaveTribe();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
                // TODO
			}}
		>
			Leave Tribe
		</button>
	);
};

LeaveTribe.propTypes = {
	tenantId: PropTypes.string.isRequired
};

LeaveTribe.defaultProps = {};