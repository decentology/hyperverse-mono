import { useTribes } from '../source';
import './style.css';

export const JoinTribe = ({ ...props }: { tenantId: string; tribeName: string }) => {
	const { joinTribe } = useTribes();

	const tribeJoin = () => {
		if (joinTribe?.(props.tenantId, props.tribeName)) {
			joinTribe?.(props.tenantId, props.tribeName);
		}
	};

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={tribeJoin}
		>
			Join Tribe
		</button>
	);
};
