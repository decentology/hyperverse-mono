# Join Tribe

<p> The `joinTribe` function from `tribesLibrary` joins a tribe. **Tenants may only join one tribe at a time and must leave their current tribe if they wish to join another.** </p>

---

<br>

### joinTribe

```jsx
	const joinTribe = async (id: number) => {
		try {
			const joinTxn = await base.proxyContract?.joinTribe(id);
			return joinTxn.wait() as TransactionReceipt;
		} catch (err) {
			throw err;
		}
	};
```

### Stories

```jsx

import React from 'react';
import { JoinTribe } from './joinTribe';
import { HyperverseProvider } from './utils/Provider';
import { Doc } from '../docs/joinTribe.mdx';

export default {
	title: 'Components/JoinTribe',
	component: JoinTribe,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<JoinTribe {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	tribeId: 1,
};

```

### Main UI Component

```jsx

import PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';

export const JoinTribe = ({ ...props }) => {
	const { joinTribe } = useTribes();
	const { address, Connect } = useEvm();

	const tribeJoin = () => {
		if (joinTribe(props.tribeId)) {
			joinTribe(props.tribeId);
		}
	};

	return address ? (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={tribeJoin}
		>
			Join Tribe
		</button>
	) : (
		<Connect />
	);
};

JoinTribe.propTypes = {
	tribeId: PropTypes.number.isRequired,
};

JoinTribe.defaultProps = {};

```

### Args

<p> We chose the tribe id of **1** for our demo which belongs to the tribe **Mage**. You are welcome to change this value to interact with the other tribes in our module.</p>

```jsx

Demo.args = {
	tribeId: 1,
};

```

For more information about our modules please visit: [**Hyperverse Docs**](https://docs.hyperverse.dev)
