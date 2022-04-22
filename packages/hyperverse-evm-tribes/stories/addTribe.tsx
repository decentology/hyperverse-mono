import * as PropTypes from 'prop-types';
import './button.css';
import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';

export const AddTribe = ({ ...props }) => {
	const { AddTribe } = useTribes();
	const { address } = useEvm();
	const { mutate } = AddTribe();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			// onClick={() => {
			// 		mutate({ metadata: '', image: File });
			// }}
		>
			Add Tribe
		</button>
	);
};

AddTribe.propTypes = {
    metadata: PropTypes.string.isRequired,
    // image: PropTypes.file.isRequired
};

AddTribe.defaultProps = {};
