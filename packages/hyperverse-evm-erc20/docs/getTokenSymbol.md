# Get Token Symbol

<p> The `getTokenSymbol` function from `useERC20` returns the symbol of a token. </p>

---

<br>

### getTokenSymbol

```jsx

	const getTokenSymbol = async () => {
		try {
			const symbol = await base.proxyContract?.symbol();
			return symbol as string;
		} catch (error) {
			throw error;
		}
	};

```

### Stories

```jsx

import { GetTokenSymbol } from './getTokenSymbol';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getTokenSymbol.mdx';

export default {
	title: 'Components/GetTokenSymbol',
	component: GetTokenSymbol,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetTokenSymbol {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};

```

### Main UI Component

```jsx

import { useERC20 } from '../source';
import { useEffect, useState } from 'react';

export const GetTokenSymbol = ({ ...props }) => {
	const erc20 = useERC20();
	const [data, setData] = useState<string>();

	useEffect(() => {
		if (erc20.getTokenSymbol) {
			erc20.getTokenSymbol().then(setData);
		}
	}, [erc20.getTokenSymbol]);

	const hasTokenSymbol = () => {
		return data ? <p>{data}</p> : <p>{JSON.stringify(erc20.error)}</p>;
	};

	return <div className="body"> Token Symbol: {hasTokenSymbol()}</div>;
};

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
