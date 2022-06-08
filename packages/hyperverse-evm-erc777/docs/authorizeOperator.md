# Authorize Operator

<p> The `authorizeOperator` function from `useERC777` aproves an address to be an operator. </p>

---

<br>

### authorizeOperator

<p> The `authorizeOperator` function takes in the address to set as an operator. </p>

```jsx
	const authorizeOperator = async (operator: string) => {
		try {
			const authorizeTxn = await base.proxyContract?.authorizeOperator(operator);
			return authorizeTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx
import { AuthorizeOperator } from './authorizeOperator';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/authorizeOperator.mdx';

export default {
	title: 'Components/AuthorizeOperator',
	component: AuthorizeOperator,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<AuthorizeOperator {...args} />
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

export const AuthorizeOperator = ({ ...props }: { operator: string }) => {
	const { authorizeOperator } = useERC777();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					authorizeOperator(props.operator);
				}}
			>
				Authorize Operator
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
