# Operator Burn

<p> The `operatorBurn` function from `useERC777` allows an operator to remove an amount of tokens from the total supply.. </p>

---

<br>

### operatorBurn

<p> The `operatorBurn` function takes in an operator's address, the amount of tokens to burn, and the operator's data. </p>

```jsx
	const operatorBurn = async ({
		account,
		amount,
		data,
		operatorData,
	}: {
		account: string;
		amount: number;
		data: string;
		operatorData: string;
	}) => {
		try {
			const operatorBurnTxn = await base.proxyContract?.operatorBurn(
				account,
				amount,
				ethers.utils.formatBytes32String(data),
				ethers.utils.formatBytes32String(operatorData)
			);
			return operatorBurnTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx
import { OperatorBurn } from './operatorBurn';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/operatorBurn.mdx';

export default {
	title: 'Components/OperatorBurn',
	component: OperatorBurn,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<OperatorBurn {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	account: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	amount: 25,
	data: '',
	operatorData: '',
};
```

### Main UI Component

```jsx
import { useERC777 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const OperatorBurn = ({
	...props
}: {
	account: string,
	amount: number,
	data: string,
	operatorData: string,
}) => {
	const { operatorBurn } = useERC777();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					operatorBurn(props);
				}}
			>
				Operator Burn
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
