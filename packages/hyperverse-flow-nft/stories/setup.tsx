import * as PropTypes from 'prop-types';
import { useNFT } from '../source';
import './style.css';

export const Setup = ({ ...props }) => {
	const { setup } = useNFT();
	const {} = setup();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				// TODO
			}}
		>
			Setup
		</button>
	);
};

Setup.propTypes = {};

Setup.defaultProps = {};
