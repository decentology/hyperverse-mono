import * as PropTypes from 'prop-types';
import './button.css';
import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';
import { useCallback, useRef } from 'react';
export const AddTribe = ({ ...props }) => {
	const { addTribe, error } = useTribes();
	const { address, connect } = useEvm();
	const imageRef = useRef(null);

	const uploadFile = useCallback(async () => {
		const resp = await fetch(props.image || imageRef.current.src);
		const blob = await resp.blob();
		const file = new File([blob], 'mage.png', { type: 'image/png' });
		const result = await addTribe({
			image: file,
			metadata: {
				name: props.name || 'Mage',
				description:
					props.description ||
					'Mage casts elemental smashes and makes sure every attack hits their targets at all times.',
			},
		});
		console.log('Result', result);
	}, [addTribe]);

	return error != null ? (
		<div>Error</div>
	) : (
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
				onClick={address ? uploadFile : connect}
			>
				{address ? 'Add Tribe' : 'Connect'}
			</button>
		</>
	);
};

AddTribe.propTypes = {
	metadata: PropTypes.string.isRequired,
	// image: PropTypes.file.isRequired
};

AddTribe.defaultProps = {};
