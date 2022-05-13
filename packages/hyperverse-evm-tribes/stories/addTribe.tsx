import * as PropTypes from 'prop-types';
import './button.css';
import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';
import { useRef } from 'react';
export const AddTribe = ({ ...props }) => {
	const tribes = useTribes();
	const imageRef = useRef(null);
	return (
		<>
			<img
				id="mage"
				ref={imageRef}
				style={{ display: 'none' }}
				src={require('./assets/mage card.png')}
			/>
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={async () => {
					const resp = await fetch(props.image || imageRef.current.src);
					const blob = await resp.blob();
					const file = new File([blob], 'mage.png', { type: 'image/png' });
					const result = await tribes.addTribe({
						image: file,
						metadata: {
							name: props.name || 'Mage',
							description:
								props.description ||
								'Mage casts elemental smashes and makes sure every attack hits their targets at all times.',
						},
					});
					console.log('Result', result);
				}}
			>
				Add Tribe
			</button>
		</>
	);
};

AddTribe.propTypes = {
	metadata: PropTypes.string.isRequired,
	// image: PropTypes.file.isRequired
};

AddTribe.defaultProps = {};
