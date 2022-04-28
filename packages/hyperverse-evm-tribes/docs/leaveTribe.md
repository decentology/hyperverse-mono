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
import { LeaveTribe } from './leaveTribe';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
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
import React from 'react';
import PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';
import { useState, useEffect } from 'react';

export const LeaveTribe = ({ ...props }) => {
	const tribes = useTribes();
	const { address } = useEvm();

	return (
		<div>
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					tribes.leaveTribe();
				}}
			>
				Leave Tribe: Knight
			</button>
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'green' }}
				onClick={() => {
					tribes.leaveTribe();
				}}
			>
				Leave Tribe: Mage
			</button>
		</div>
	);
};

LeaveTribe.propTypes = {};

LeaveTribe.defaultProps = {};
```

### Args

<p> There are no arguments for this component. </p>

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
