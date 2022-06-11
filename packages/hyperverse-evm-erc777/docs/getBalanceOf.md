# Get Balance Of

<p> The `getBalanceOf` function from `useERC777` returns the available balance of a provided address. </p>

---

<br>

### getBalanceOf

<p> The `getBalanceOf` function takes in an account. </p>

```jsx
const getBalanceOf = async (account: string) => {
	try {
		const balance = await base.proxyContract?.balanceOf(account);
		return BigNumber.from(balance).toNumber();
	} catch (error) {
		throw error;
	}
};
```

### Stories

```jsx
import { GetBalanceOf } from './getBalanceOf';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/getBalanceOf.mdx';

export default {
	title: 'Components/GetBalanceOf',
	component: GetBalanceOf,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetBalanceOf {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	account: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
};
```

### Main UI Component

```jsx
import { useERC777 } from '../source';
import { useEffect, useState } from 'react';

export const GetBalanceOf = ({ ...props }: { account: string }) => {
	const erc777 = useERC777();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (erc777.getBalanceOf) {
			erc777.getBalanceOf(props.account).then(setData);
		}
	}, [erc777.getBalanceOf]);

	const balanceAvailable = () => {
		return data ? <p>{data} tokens</p> : <p>{erc777.error}</p>;
	};

	return (
		<div className="body">
			{' '}
			Balance of <b>{props.account}</b>: {balanceAvailable()}
		</div>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
