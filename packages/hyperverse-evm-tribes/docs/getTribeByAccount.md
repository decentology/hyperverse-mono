# Get Tribe by Account

<p> The `getTribeByAccount` function from `tribesLibrary` returns a tribe associated with an account. </p>

---

<br>

### getTribeByAccount

<p> The `getTribeByAccount` function takes in an Id. </p>

```jsx

```

### Stories

```jsx
import { GetTribeByAccount } from './getTribeByAccount';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getTribeByAccount.mdx';

export default {
	title: 'Components/GetTribeByAccount',
	component: GetTribeByAccount,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetTribeByAccount {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
```

### Main UI Component

```jsx
import * as PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useState, useEffect } from 'react';

export const GetTribeByAccount = ({ ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState(null);

	useEffect(() => {
		return () => {
			tribes.getTribeByAccount('').then(setData); // Need to pass an account
		};
	}, []);

	return (
		<div className="tribeByAccount">
			Tribe: <b>{data}</b>
		</div>
	);
};

GetTribeByAccount.propTypes = {};

GetTribeByAccount.defaultProps = {};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
