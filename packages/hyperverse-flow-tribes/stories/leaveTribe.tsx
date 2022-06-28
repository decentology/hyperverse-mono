import { useTribes } from '../source';
import './style.css';

export const LeaveTribe = ({ ...props }: { tenantId: string }) => {
	const { leaveTribe } = useTribes();

	const tribeLeave = () => {
		if (leaveTribe?.(props.tenantId)) {
			leaveTribe?.(props.tenantId);
		}
	};

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={tribeLeave}
		>
			Leave Tribe
		</button>
	);
};
