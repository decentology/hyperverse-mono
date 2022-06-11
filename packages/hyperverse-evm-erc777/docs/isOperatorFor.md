# Is Operator For

<p> The `isOperatorFor` function from `useERC777` returns the operator status of a given address for the token holder. </p>

---

<br>

### isOperatorFor

<p> The `isOperatorFor` function takes in the operator and the token holder. </p>

```jsx
const checkOperator = async ({
	operator,
	tokenHolder,
}: {
	operator: string,
	tokenHolder: string,
}) => {
	try {
		const isOperator = await base.proxyContract?.isOperatorFor(operator, tokenHolder);
		return isOperator;
	} catch (error) {
		throw error;
	}
};
```

### Stories

```jsx
import { IsOperatorFor } from './isOperatorFor';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/isOperatorFor.mdx';

export default {
	title: 'Components/IsOperatorFor',
	component: IsOperatorFor,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<IsOperatorFor {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	operator: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	tokenHolder: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
};
```

### Main UI Component

```jsx
import { useERC777 } from '../source';
import { useEffect, useState } from 'react';

export const IsOperatorFor = ({ ...props }: { operator: string, tokenHolder: string }) => {
	const erc777 = useERC777();
	const [data, setData] = useState();

	useEffect(() => {
		if (erc777.checkOperator) {
			erc777.checkOperator(props).then(setData);
		}
	}, [erc777.checkOperator]);

	const operatorExists = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>Error.</p>;
	};

	return (
		<div className="body">
			{' '}
			Operator for: <b>{props.tokenHolder}</b> {operatorExists()}
		</div>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
