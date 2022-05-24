import PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';

export const JoinTribe = ({ ...props }) => {
	const { joinTribe } = useTribes();
	const { address, Connect } = useEvm();

	const tribeJoin = () => {
		if (joinTribe(props.tribeId)) {
			joinTribe(props.tribeId);
		}
	};

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

JoinTribe.propTypes = {
	tribeId: PropTypes.number.isRequired,
};

JoinTribe.defaultProps = {};
