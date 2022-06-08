
# Create Instance

<p> The `createInstance` function from `useERC777` allows a user to create a new instance. </p>

---

<br>

### createInstance

<p> The `createInstance` function takes in the account, the name of the token, the symbol representing that token, and an initial supply. </p>

```jsx
	const createInstance = useCallback(
		async (account: string, name: string, symbol: string, decimal: number) => {
			try {
				const createTxn = await factoryContract.createInstance(
					account,
					name,
					symbol,
					decimal
				);
				return createTxn.wait();
			} catch (err) {
				errors(err);
				throw err;
			}
		},
		[factoryContract?.signer]
	);
```

### Stories

```jsx
import { NewInstance } from './newInstance';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/newInstance.mdx';

export default {
	title: 'Components/NewInstance',
	component: NewInstance,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<NewInstance {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
```

### Main UI Component

```jsx

import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const NewInstance = ({ ...props }) => {
	const { createInstance } = useERC777();
	const { address, Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					createInstance({
						account: address,
						tokenName: 'TEST',
						tokenSymbol: 'TST',
						operator: ['0x976EA74026E726554dB657fA54763abd0C3a0aa9'],
						initialSupply: 50000,
					});
				}}
			>
				New Instance
			</button>
		</>
	);
};

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
