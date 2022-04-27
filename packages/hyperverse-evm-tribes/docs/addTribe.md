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
import { AddTribe } from './addTribe';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/addTribe.mdx';

export default {
	title: 'Components/AddTribe',
	component: AddTribe,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<AddTribe {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
    metdata: '',
    image: File
};
```

### Main UI Component

```jsx
import * as PropTypes from 'prop-types';
import './button.css';
import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';

export const AddTribe = ({ ...props }) => {
	const tribes = useTribes();
	const { address } = useEvm();
	// const { mutate } = AddTribe();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			// onClick={() => {
			// 		mutate({ metadata: '', image: File });
			// }}
		>
			Add Tribe
		</button>
	);
};

AddTribe.propTypes = {
    metadata: PropTypes.string.isRequired,
    // image: PropTypes.file.isRequired
};

AddTribe.defaultProps = {};
```

### Args

```jsx
// Incomplete
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
