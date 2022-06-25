# Approve

<p> The `approve` function from `nftGame1Library` sets approves the transfer of a token to another address. </p>

---

<br>

### approve

<p> The `approve` function takes in the target address and the token Id. </p>

```jsx
  const approve = async ({ to, tokenId }: { to: string; tokenId: number }) => {
    try {
      const approveTxn = await base.proxyContract?.approve(to, tokenId);
      return approveTxn.wait() as TransactionReceipt;
    } catch (error) {
      throw error;
    }
  }
```

### Stories

```jsx
import { Approve } from './approve';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/approve.mdx';

export default {
	title: 'Components/Approve',
	component: Approve,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<Approve {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	to: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	tokenId: 1,
};
```

### Main UI Component

```jsx
import { useNFTGame1 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const Approve = ({ ...props }: { to: string, tokenId: number }) => {
	const { approve } = useNFTGame1();
	const { address, Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					approve(props);
				}}
			>
				Approve
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
