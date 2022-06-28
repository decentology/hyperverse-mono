# Set Mint Permissions

<p> The `setMintPermissions` function from `nftGameLibrary` sets public minting to either true or false. </p>

---

<br>

### setMintPermissions

<p> The `setMintPermissions` function takes in a base URI. </p>

```jsx
	const setMintPermissions = async (isPublic: boolean) => {
		try {
			const toggleTxn = await base.proxyContract?.setMintPermissions(isPublic);
			return toggleTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx

import { SetMintPermissions } from './setMintPermissions';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/setMintPermissions.mdx';

export default {
	title: 'Components/SetMintPermissions',
	component: SetMintPermissions,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<SetMintPermissions {...args} />
	</HyperverseProvider>
);

export const True = Template.bind({});

True.args = {
	isPublic: true,
};

export const False = Template.bind({});

False.args = {
	isPublic: false,
};

```

### Main UI Component

```jsx

import { useNFTGame } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const SetMintPermissions = ({ ...props }: { isPublic: boolean }) => {
	const { setMintPermissions } = useNFTGame();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					setMintPermissions?.(props.isPublic);
				}}
			>
				Set Mint Permissions
			</button>
		</>
	);
};

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
