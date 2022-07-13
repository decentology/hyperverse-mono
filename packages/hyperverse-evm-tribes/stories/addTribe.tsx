import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useCallback, useRef } from 'react';
import './style.css';

export const AddTribe = ({ ...props }) => {
	const { addTribe, error } = useTribes();
	const { address, Connect } = useEvm();
	const imageRef = useRef(null);

	const uploadFile = useCallback(async () => {
		const resp = await fetch(props.image || imageRef.current.src);
		const blob = await resp.blob();
		const file = new File([blob], 'mage.png', { type: 'image/png' });
		const result = await addTribe?.({
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
			{address ? (
				<button
					type="button"
					className={['storybook-button', `storybook-button--large`].join(' ')}
					style={{ color: 'blue' }}
					onClick={uploadFile}
				>
					Add Tribe
				</button>
			) : (
				<Connect />
			)}
		</>
	);
};