# Get Balance

<p> The `getBalance` function from `useERC20` returns the available balance of the sender. </p>

---

<br>

### getBalance

```jsx

	const getBalance = async () => {
		try {
			const balance = await base.proxyContract?.balance();
			return BigNumber.from(balance);
		} catch (error) {
			throw error;
		}
	};

```

### Stories

```jsx

import { GetBalance } from './getBalance';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getBalance.mdx';

export default {
	title: 'Components/GetBalance',
	component: GetBalance,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetBalance {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};

```

### Main UI Component

```jsx

import { useERC20 } from '../source';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

export const GetBalance = ({ ...props }) => {
	const erc20 = useERC20();
	const [data, setData] = useState<BigNumber>();

	useEffect(() => {
		if (erc20.getBalance) {
			erc20.getBalance().then(setData);
		}
	}, [erc20.getBalance]);

	const balanceAvailable = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(erc20.error)}</p>;
	};

	return <div className="body"> Balance: {balanceAvailable()}</div>;
};

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
