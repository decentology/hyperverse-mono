# Get Granularity

<p> The `getGranularity` function from `useERC777` returns the smallest part of the token that is not divisible. </p>

---

<br>

### getGranularity

```jsx
	const getGranularity = async () => {
		try {
			const granularity = await base.proxyContract?.granularity();
			return granularity as number;
		} catch (error) {
			throw error;
		}
	};
```

### Stories

```jsx
import { GetGranularity } from './getGranularity';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/getGranularity.mdx';

export default {
	title: 'Components/GetGranularity',
	component: GetGranularity,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetGranularity {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
```

### Main UI Component

```jsx
import { useERC777 } from '../source';
import { useEffect, useState } from 'react';

export const GetGranularity = ({ ...props }) => {
	const erc777 = useERC777();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (erc777.getGranularity) {
			erc777.getGranularity().then(setData);
		}
	}, [erc777.getGranularity]);

	const granularity = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{erc777.error}</p>;
	};

	return <div className="body"> Granularity: {granularity()}</div>;
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
