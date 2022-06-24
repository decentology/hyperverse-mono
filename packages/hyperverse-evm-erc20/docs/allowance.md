# Allowance

<p> The `allowance` function from `useERC20` returns the amount an address is allocated to spend. </p>

---

<br>

### allowance

<p> The `allowance` function takes in the owner and the spender. </p>

```jsx

const allowance = async (owner: string, spender: string) => {
	try {
		const allowance = await base.proxyContract?.allowance(owner, spender);
		return BigNumber.from(allowance);
	} catch (error) {
		throw error;
	}
};

```

### Stories

```jsx

import { Allowance } from './allowance';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/allowance.mdx';

export default {
	title: 'Components/Allowance',
	component: Allowance,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<Allowance {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	owner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
	spender: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
};

```

### Main UI Component

```jsx

import { useERC20 } from '../source';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

export const Allowance = ({ ...props }: { owner: string; spender: string }) => {
	const erc20 = useERC20();
	const [data, setData] = useState<BigNumber>();

	useEffect(() => {
		if (erc20.allowance) {
			erc20.allowance(props.owner, props.spender).then(setData);
		}
	}, [erc20.allowance]);

	const allowance = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(erc20.error)}</p>;
	};

	return <div className="body"> Allowance: {allowance()}</div>;
};

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
