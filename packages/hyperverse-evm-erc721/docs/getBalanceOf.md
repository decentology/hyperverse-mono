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
	account: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', // tenantId address
};
```

### Main UI Component

```jsx
import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';

export const GetBalanceOf = ({ ...props }: { account: string }) => {
	const erc721 = useERC721();
	const { address } = useEvm();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (erc721.getBalanceOf) {
			erc721.getBalanceOf(props.account).then(setData);
		}
	}, [erc721.getBalanceOf]);

	const balanceAvailable = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>Error.</p>;
	};

	return (
		<div className="balanceOf">
			{' '}
			Balance of: {props.account} {balanceAvailable()}
		</div>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
