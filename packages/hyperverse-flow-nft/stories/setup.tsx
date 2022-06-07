import { useNFT } from '../source';
import './style.css';

export const Setup = ({ ...props }) => {
	const { setup } = useNFT();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				setup();
			}}
		>
			Setup
		</button>
	);
};
