# Leave Tribe

<p> The `leaveTribe` function from `tribesLibrary` leaves a tribe. </p>

---

<br>

### leaveTribe

```jsx
	const leaveTribe = async () => {
		try {
			const leaveTxn = await base.proxyContract?.leaveTribe();
			await leaveTxn.wait();
			return leaveTxn.hash as string;
		} catch (err) {
			throw err;
		}
	};
```

### Stories

```jsx

import React from 'react';
import { LeaveTribe } from './leaveTribe';
import { HyperverseProvider } from './utils/Provider';
import { Doc } from '../docs/leaveTribe.mdx';

export default {
	title: 'Components/LeaveTribe',
	component: LeaveTribe,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<LeaveTribe {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};

```

### Main UI Component

```jsx

import PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';

export const LeaveTribe = ({ ...props }) => {
	const { leaveTribe, error } = useTribes();
	const { address, Connect } = useEvm();
	console.log('address', address);

	const tribeLeave = () => {
		if (leaveTribe()) {
			leaveTribe();
		}
	};

	return address ? (
		<button
			type="button"
			className={['storybook-button', `storybook-button--large`].join(' ')}
			style={{ color: 'blue' }}
			onClick={tribeLeave}
		>
			Leave Tribe
		</button>
	) : (
		<Connect />
	);
};

LeaveTribe.propTypes = {};

LeaveTribe.defaultProps = {};

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
