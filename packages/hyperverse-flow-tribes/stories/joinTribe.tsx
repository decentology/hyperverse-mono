import * as PropTypes from 'prop-types';
import { useTribes } from '../source';
import './style.css';

export const JoinTribe = ({ ...props }) => {
	const { joinTribe } = useTribes();
	const { } = joinTribe();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
                // TODO
			}}
		>
			Add Tribe
		</button>
	);
};

JoinTribe.propTypes = {
	tenantId: PropTypes.string.isRequired,
    tribeName: PropTypes.string.isRequired
};

JoinTribe.defaultProps = {};