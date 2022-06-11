# Get Decimals

<p> The `getDecimals` function from `useERC777` returns the number of decimals. This function will always return a value of 18 as ERC20 tokens use this value by default. </p>

---

<br>

### getDecimals

```jsx
	const getDecimal = async () => {
		try {
			const decimal = await base.proxyContract?.decimals();
			return decimal as number;
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx
import { GetDecimals } from './getDecimals';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/getDecimals.mdx';

export default {
	title: 'Components/GetDecimals',
	component: GetDecimals,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetDecimals {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
```

### Main UI Component

```jsx
import { useERC777 } from '../source';
import { useEffect, useState } from 'react';

export const GetDecimals = ({ ...props }) => {
	const erc777 = useERC777();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (erc777.getDecimal) {
			erc777.getDecimal().then(setData);
		}
	}, [erc777.getDecimal]);

	const decimalsAvailable = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{erc777.error}</p>;
	};

	return <div className="body"> Decimal: {decimalsAvailable()}</div>;
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
