# Toggle Public Mint

<p> The `togglePublicMint` function from `nftGame1Library` toggles between allowing other users who
are not the tenant to mint and or not mint.  </p>

---

<br>

### togglePublicMint

```jsx
  const togglePublicMint = async () => {
    try {
      const toggle = await base.proxyContract?.togglePublicMint();
      return toggle.wait() as TransactionReceipt;
    } catch (error) {
      throw error;
    }
  }
```

### Stories

```jsx
import { TogglePublicMint } from './togglePublicMint';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/togglePublicMint.mdx';

export default {
	title: 'Components/TogglePublicMint',
	component: TogglePublicMint,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<TogglePublicMint {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
```

### Main UI Component

```jsx
import { useNFTGame1 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const TogglePublicMint = ({ ...props }) => {
	const { togglePublicMint } = useNFTGame1();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					togglePublicMint();
				}}
			>
				Public Mint
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
