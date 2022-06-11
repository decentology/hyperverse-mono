# Revoke Operator

<p> The `revokeOperator` function from `useERC777` removes an address as an operator. </p>

---

<br>

### revoteOperator

<p> The `revokeOperator` function takes in the operator's address. </p>

```jsx
	const revokeOperator = async (operator: string) => {
		try {
			const revokeTxn = await base.proxyContract?.revokeOperator(operator);
			return revokeTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx
import { RevokeOperator } from './revokeOperator';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/revokeOperator.mdx';

export default {
	title: 'Components/RevokeOperator',
	component: RevokeOperator,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<RevokeOperator {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	operator: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
};
```

### Main UI Component

```jsx
import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const RevokeOperator = ({ ...props }: { operator: string }) => {
	const { revokeOperator } = useERC777();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					revokeOperator(props.operator);
				}}
			>
				Revoke Operator
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
