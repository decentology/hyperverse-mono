# Get Token Symbol

<p> The `getTokenSymbol` function from `useERC777` returns the symbol of the token. </p>

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
import Doc from '../docs/getTokenSymbol.mdx';

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
import { useERC777 } from '../source';
import { useEffect, useState } from 'react';

export const GetTokenSymbol = ({ ...props }) => {
	const erc777 = useERC777();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (erc777.getTokenSymbol) {
			erc777.getTokenSymbol().then(setData);
		}
	}, [erc777.getTokenSymbol]);

	const tokenSymbol = () => {
		return data ? <p>{data}</p> : <p>{erc777.error}</p>;
	};

	return <div className="body"> Token Symbol: {tokenSymbol()}</div>;
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
