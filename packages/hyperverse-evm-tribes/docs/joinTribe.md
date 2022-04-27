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
import { JoinTribe } from './joinTribe';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
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
    knightId: 1,
    mageId: 2
};
```

### Main UI Component

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';

export const JoinTribe = ({ ...props }) => {
	const tribes = useTribes();
	const { address, connect } = useEvm();

	return (
		<div>
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					// tribes.joinTribe(id: 2)
				}}
			>
				Join Tribe: Knight
			</button>
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'green' }}
				onClick={() => {
					// tribes.joinTribe(id: 2)
				}}
			>
				Join Tribe: Mage
			</button>
		</div>
	);
};

JoinTribe.propTypes = {
	knightId: PropTypes.number.isRequired,
	mageId: PropTypes.number.isRequired,
};

JoinTribe.defaultProps = {};
```

### Args

<p> Each tribe has its own tribe ID and is passed into the component.</p>

```jsx
JoinTribe.propTypes = {
	knightId: PropTypes.number.isRequired,
	mageId: PropTypes.number.isRequired,
};

JoinTribe.defaultProps = {};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
