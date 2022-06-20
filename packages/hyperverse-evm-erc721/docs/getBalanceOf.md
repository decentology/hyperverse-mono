# Get Balance Of

<p> The `getBalanceOf` function from `erc721Library` returns the current available balance of a provided address. </p>

---

<br>

### getBalanceOf

<p> The `getBalanceOf` function takes in an account. </p>

```jsx
  const getBalanceOf = async (account: string) => {
		try {
			const balance = await base.proxyContract?.balanceOf(account);
			return BigNumber.from(balance) as BigNumber;
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
	account: '0x976EA74026E726554dB657fA54763abd0C3a0aa9'
};
```

### Main UI Component

```jsx
import { useERC721 } from '../source';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

export const GetBalanceOf = ({ ...props }: { account: string }) => {
	const erc721 = useERC721();
	const [data, setData] = useState<BigNumber>();

	useEffect(() => {
		if (erc721.getBalanceOf) {
			erc721.getBalanceOf(props.account).then(setData);
		}
	}, [erc721.getBalanceOf]);

	const balanceAvailable = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(erc721.error)}</p>;
	};

	return (
		<div className="body">
			{' '}
			Balance of: <b>{props.account}</b> {balanceAvailable()}
		</div>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
