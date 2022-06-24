# Get Token Name

<p> The `getTokenName` function from `useERC20` returns the name of the token. </p>

---

<br>

### getTokenName

```jsx

	const getTokenName = async () => {
		try {
			const name = await base.proxyContract?.name();
			return name as string;
		} catch (error) {
			throw error;
		}
	};
	
```

### Stories

```jsx

import { GetTokenName } from './getTokenName';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getTokenName.mdx';

export default {
	title: 'Components/GetTokenName',
	component: GetTokenName,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetTokenName {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};

```

### Main UI Component

```jsx

import { useERC20 } from '../source';
import { useEffect, useState } from 'react';

export const GetTokenName = ({ ...props }) => {
	const erc20 = useERC20();
	const [data, setData] = useState<string>();

	useEffect(() => {
		if (erc20.getTokenName) {
			erc20.getTokenName().then(setData);
		}
	}, [erc20.getTokenName]);

	const hasTokenName = () => {
		return data ? <p>{data}</p> : <p>{JSON.stringify(erc20.error)}</p>;
	};

	return <div className="body"> Token Name: {hasTokenName()}</div>;
};

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
