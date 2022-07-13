# Get Total Supply

<p> The `getTotalSupply` function from `useERC20` returns the total number of tokens. </p>

---

<br>

### getTotalSupply

```jsx

	const getTotalSuply = async () => {
		try {
			const totalSupply = await base.proxyContract?.totalSupply();
			return BigNumber.from(totalSupply);
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
import { Doc } from '../docs/getTotalSupply.mdx';

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

import { useERC20 } from '../source';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

export const GetTotalSupply = ({ ...props }) => {
	const erc20 = useERC20();
	const [data, setData] = useState<BigNumber>();

	useEffect(() => {
		if (erc20.getTotalSuply) {
			erc20.getTotalSuply().then(setData);
		}
	}, [erc20.getTotalSuply]);

	const hasTokens = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(erc20.error)}</p>;
	};

	return <div className="body"> Total Supply: {hasTokens()}</div>;
};

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
