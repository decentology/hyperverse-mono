# Operator Send

<p> The `operatorSend` function from `useERC777` allows an operator to transfer tokens to another address. </p>

---

<br>

### operatorSend

<p> The `operatorSend` function takes in the operator's address, the address of the recipient, the amount of tokens being transferred, and the operator's data. </p>

```jsx
	const operatorSend = async ({
		sender,
		recipient,
		amount,
		data,
		operatorData,
	}: {
		sender: string;
		recipient: string;
		amount: number;
		data: string;
		operatorData: string;
	}) => {
		try {
			const operatorSendTxn = await base.proxyContract?.operatorSend(
				sender,
				recipient,
				amount,
				ethers.utils.formatBytes32String(data),
				ethers.utils.formatBytes32String(operatorData)
			);
			return operatorSendTxn.wait() as TransactionReceipt;
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx
import { OperatorSend } from './operatorSend';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/operatorSend.mdx';

export default {
	title: 'Components/OperatorSend',
	component: OperatorSend,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<OperatorSend {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	sender: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	recipient: '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
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

export const OperatorSend = ({
	...props
}: {
	sender: string,
	recipient: string,
	amount: number,
	data: string,
	operatorData: string,
}) => {
	const { operatorSend } = useERC777();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					operatorSend(props);
				}}
			>
				Operator Send
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
