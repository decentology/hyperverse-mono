import * as PropTypes from 'prop-types';
import { useTribes } from '../source';
import './style.css';

export const AddTribe = ({ ...props }) => {
	const { addTribe } = useTribes();
	const { } = addTribe('', '', '');

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

AddTribe.propTypes = {
	newTribeName: PropTypes.string.isRequired,
    ipfsHash: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

AddTribe.defaultProps = {};