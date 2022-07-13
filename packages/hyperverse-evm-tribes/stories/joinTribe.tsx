import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const JoinTribe = ({ ...props }: { tribeId: number }) => {
	const { joinTribe, error } = useTribes();
	const { address, Connect } = useEvm();

	const tribeJoin = () => {
		if (joinTribe?.(props.tribeId)) {
			joinTribe?.(props.tribeId);
		}
	};

	return error != null ? (
		<div>Error</div>
	) : (
		<>
			{address ? (
				<button
					type="button"
					className={['storybook-button', `storybook-button--large`].join(' ')}
					style={{ color: 'blue' }}
					onClick={tribeJoin}
				>
					Join Tribe
				</button>
			) : (
				<Connect />
			)}
		</>
	);
};
