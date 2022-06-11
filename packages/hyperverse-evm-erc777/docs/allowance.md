# Allowance

<p> The `allowance` function from `useERC777` returns the amount of allocated tokens given to a spender by the token owner to spend on their behalf. </p>

---

<br>

### allowance

<p> The `allowance` function takes in the owner and the spender. </p>

```jsx
const allowance = async (owner: string, spender: string) => {
	try {
		const allowance = await base.proxyContract?.allowance(owner, spender);
		return BigNumber.from(allowance).toNumber();
	} catch (error) {
		throw error;
	}
};
```

### Stories

```jsx
import { NewInstance } from './newInstance';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/newInstance.mdx';

export default {
	title: 'Components/NewInstance',
	component: NewInstance,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<NewInstance {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
```

### Main UI Component

```jsx
import { Allowance } from './allowance';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import Doc from '../docs/allowance.mdx';

export default {
	title: 'Components/Allowance',
	component: Allowance,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<Allowance {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	owner: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	spender: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
