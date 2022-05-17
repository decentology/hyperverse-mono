# Add Tribe

<p> The `addTribe` function from `tribesLibrary` adds a new tribe. </p>

---

<br>

### addTribe

<p> The `addTribes` function takes in metadata and an image file. </p>

```jsx
const addTribe = async ({ metadata, image }: { metadata: Omit<MetaData, 'image'>, image: File }) => {
		try {
			const { skylink: imageLink } = await hyperverse!.storage!.uploadFile(image);
			const fullMetaData: MetaData = {
				...metadata,
				image: imageLink
			};
			const metadataFile = new File([JSON.stringify(fullMetaData)], 'metadata.json');
			const { skylink: metadataFileLink } = await hyperverse!.storage!.uploadFile(
				metadataFile
			);

			const addTxn = await base.proxyContract?.addNewTribe(metadataFileLink);
			return addTxn.wait() as TransactionReceipt;
		} catch (err) {
			throw err;
		}
	};
```

### Stories

```jsx

import React from 'react';
import { AddTribe } from './addTribe';
import { HyperverseProvider } from './utils/Provider';

export default {
	title: 'Components/AddTribe',
	component: AddTribe,
	argTypes: {
		image: { control: { type: 'file', accept: '.png' } },
		name: { control: { type: 'text' } },
		description: { control: { type: 'text' } },
	},
	parameters: {
		layout: 'fullscreen',
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<AddTribe {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};

```

### Main UI Component

```jsx

import PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';
import { useCallback, useRef } from 'react';
export const AddTribe = ({ ...props }) => {
	const { addTribe, error } = useTribes();
	const { address, Connect } = useEvm();
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

AddTribe.propTypes = {
	metadata: PropTypes.string.isRequired,
};

AddTribe.defaultProps = {};

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
