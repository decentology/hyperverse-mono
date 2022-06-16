import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const JoinTribe = ({ ...props }: {tribeId: number}) => {
	const { joinTribe } = useTribes();
	const { address, Connect } = useEvm();

	const tribeJoin = () => {
		if (joinTribe?.(props.tribeId)) {
			joinTribe?.(props.tribeId);
		}
	};
	console.log('address', address)

	return address ? (
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
	);
};