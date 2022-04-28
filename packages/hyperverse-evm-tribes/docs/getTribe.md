# Get Tribe

<p> The `getTribe` function from `tribesLibrary` returns a tribe's data. </p>

---

<br>

### getTribe

<p> The `getTribe` function takes in an Id. </p>

```jsx
	const getTribe = async (id: number) => {
		try {
			await base.proxyContract?.getTribeData(id);
			return formatTribeResultFromTribeId(id);
		} catch (err) {
			throw err;
		}
	};
```

### Stories

```jsx
import { GetTribe } from './getTribe';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getTribe.mdx';

export default {
	title: 'Components/GetTribe',
	component: GetTribe,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetTribe {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	id: 1,
};
```

### Main UI Component

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useState, useEffect } from 'react'
import { id } from 'ethers/lib/utils';

export const GetTribe = ({ ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState(null);
	useEffect(() => {
		return () => {
			tribes.getTribe().then(setData);
		};
	}, [])

	return (
		<div className="tribe">
			Tribe: <b>{data}</b>
		</div>
	);
};

GetTribe.propTypes = {
	id: PropTypes.number.isRequired,
};

GetTribe.defaultProps = {};
```

### Args

```jsx
GetTribe.propTypes = {
	id: PropTypes.number.isRequired,
};

GetTribe.defaultProps = {};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
