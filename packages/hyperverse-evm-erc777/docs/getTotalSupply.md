# Get Total Supply

<p> The `getTotalSupply` function from `useERC777` returns the total supply of tokens. </p>

---

<br>

### getTotalSupply

```jsx
const getTotalSuply = async () => {
	try {
		const totalSupply = await base.proxyContract?.totalSupply();
		return BigNumber.from(totalSupply).toNumber();
	} catch (error) {
		throw error;
	}
};
```

### Stories

```jsx
import { GetTotalSupply } from './getTotalSupply';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/getTotalSupply.mdx';

export default {
	title: 'Components/GetTotalSupply',
	component: GetTotalSupply,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetTotalSupply {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
```

### Main UI Component

```jsx
import { useERC777 } from '../source';
import { useEffect, useState } from 'react';

export const GetTotalSupply = ({ ...props }) => {
	const erc777 = useERC777();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (erc777.getTotalSuply) {
			erc777.getTotalSuply().then(setData);
		}
	}, [erc777.getTotalSuply]);

	const totalSupply = () => {
		return data ? <p>{data} tokens</p> : <p>{erc777.error}</p>;
	};

	return <div className="body"> Total Supply: {totalSupply()}</div>;
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
