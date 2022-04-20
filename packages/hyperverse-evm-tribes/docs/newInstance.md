# New Instance

<p> The `createInstance` function from `useTribes` allows a user to connect their wallet where they can create a new instance. </p>

---

<br>

### createInstance

<p> The `createInstance` function takes in an account. </p>

```jsx
	const createInstance = useCallback(
		async (account: string) => {
			try {
				const createTxn = await factoryContract.createInstance(account);
				return createTxn.wait();
			} catch (err) {
				factoryErrors(err);
				throw err;
			}
		},
		[factoryContract?.signer]
	);
```

### Stories

```jsx
import { NewInstance } from './newInstance';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/newInstance.mdx';

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

export const Account = Template.bind({});

Account.args = {
	account: null,
};
```

### Main UI Component

```jsx
export const NewInstance = ({ ...props }) => {
	const { NewInstance } = useTribes();
	const { address, connect } = useEvm();
	const { mutate } = NewInstance();

	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={() => {
				console.log('Calling mutate');
				if (address) {
					mutate({ account: address });
				} else {
					connect();
				}
			}}
		>
			{address ? 'New Instance' : 'Connect'}
		</button>
	);
};

NewInstance.propTypes = {
	account: PropTypes.string.isRequired
};

NewInstance.defaultProps = {};
};
```

### Args

<p> For testing purposes, the information needed to create an instance is given in **Provider.tsx**.</p>

```jsx
NewInstance.propTypes = {
	account: PropTypes.string.isRequired
};

NewInstance.defaultProps = {};
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)