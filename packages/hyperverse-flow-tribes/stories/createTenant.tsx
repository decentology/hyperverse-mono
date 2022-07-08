import { useTribes } from '../source';
import { useFlow } from '@decentology/hyperverse-flow/source';
import './style.css';

export const CreateTenant = ({ ...props }) => {
	const { createTenant } = useTribes();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={createTenant}
		>
			New Instance
		</button>
	);
};
