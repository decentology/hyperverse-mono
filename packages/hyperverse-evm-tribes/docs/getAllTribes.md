# Get All Tribes

<p> The `getAllTribes` function from `tribesLibrary` returns all tribes. </p>

---

<br>

### getAllTribes

```jsx
	const getAllTribes = async () => {
		try {
			const tribeCount = await base.proxyContract?.tribeCounter();
			const tribes: MetaDataFormatted[] = [];
			if (tribeCount) {
				for (let tribeId = 1; tribeId <= tribeCount.toNumber(); ++tribeId) {
					const json = await formatTribeResultFromTribeId(tribeId);
					tribes.push(json);
				}
			}
			return tribes;
		} catch (err) {
			throw err;
		}
	};
```

### Stories

```jsx
import { GetAllTribes } from './getAllTribes';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getAllTribes.mdx';

export default {
	title: 'Components/GetAllTribes',
	component: GetAllTribes,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetAllTribes {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
```

### Main UI Component

```jsx
import * as PropTypes from 'prop-types';
import './button.css';
import { useTribes } from '../source';
import { useEffect, useState } from 'react';

export const GetAllTribes = ({ ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState(null);
	useEffect(() => {
		tribes.getAllTribes().then(setData);
	}, []);

	return (
		<div className="tribes">
			All Tribes: <b>{data}</b>
		</div>
	);
};

GetAllTribes.propTypes = {};

GetAllTribes.defaultProps = {};
```

### Args

```jsx
// Incomplete
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
