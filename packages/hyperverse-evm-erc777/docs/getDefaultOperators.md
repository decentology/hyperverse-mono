# Get Default Operators

<p> The `getDefaultOperators` function from `useERC777` returns a list of default operators. </p>

---

<br>

### getDefaultOperators

```jsx
const getDefaultOperators = async () => {
	try {
		const operators = await base.proxyContract?.defaultOperators();
		return operators;
	} catch (error) {
		throw error;
	}
};
```

### Stories

```jsx
import { GetDefaultOperators } from './getDefaultOperators';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/getDefaultOperators.mdx';

export default {
	title: 'Components/GetDefaultOperators',
	component: GetDefaultOperators,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetDefaultOperators {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
```

### Main UI Component

```jsx
import { useERC777 } from '../source';
import { useEffect, useState } from 'react';

export const GetDefaultOperators = ({ ...props }) => {
	const erc777 = useERC777();
	const [data, setData] = useState();

	useEffect(() => {
		if (erc777.getDefaultOperators) {
			erc777.getDefaultOperators().then(setData);
		}
	}, [erc777.getDefaultOperators]);

	const operators = () => {
		return data ? <p>{data}</p> : <p>{erc777.error}</p>;
	};

	return <div className="body"> Default Operators: {operators()}</div>;
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
