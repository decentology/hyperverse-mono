# Set Base URI

<p> The `setBaseURI` function from `nftGameLibrary` sets the base URI for your NFTs. </p>

---

<br>

### setBaseURI

<p> The `setBaseURI` function takes in a base URI. </p>

```jsx
	const setBaseURI = async (baseURI: string) => {
		try {
			const setBaseURITxn = await base.proxyContract?.setBaseURI(baseURI);
			return setBaseURITxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx

import { SetBaseURI } from './setBaseURI';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/setBaseURI.mdx';

export default {
	title: 'Components/SetBaseURI',
	component: SetBaseURI,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<SetBaseURI {...args} />
	</HyperverseProvider>
);

export const BaseURI1 = Template.bind({});

BaseURI1.args = {
	baseURI: 'https://site-1.com/nfts/',
};

export const BaseURI2 = Template.bind({});

BaseURI2.args = {
	baseURI: 'https://site-2.com/nfts/',
};

```

### Main UI Component

```jsx

import { useNFTGame } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const SetBaseURI = ({ ...props }: { baseURI: string }) => {
	const { setBaseURI } = useNFTGame();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					setBaseURI?.(props.baseURI);
				}}
			>
				Set Base URI
			</button>
		</>
	);
};

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
