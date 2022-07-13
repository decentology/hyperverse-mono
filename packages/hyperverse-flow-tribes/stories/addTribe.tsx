import { useTribes } from '../source';
import { useFlow } from '@decentology/hyperverse-flow';
import './style.css';

export const AddTribe = ({ ...props }) => {
	const tribes = useTribes();

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