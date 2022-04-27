import * as PropTypes from 'prop-types';
import { useRandomPick } from '../source';
import './button.css';

export const RandomPick = ({ ...props }) => {
	const { getRandomPick } = useRandomPick();
	const {} = getRandomPick('');

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				// TODO
			}}
		>
			Mint NFT
		</button>
	);
};

RandomPick.propTypes = {
    tenantId: PropTypes.string.isRequired;
};

RandomPick.defaultProps = {};
