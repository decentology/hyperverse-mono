# Get All Tribes

<p> The `getAllTribes` function from `tribesLibrary` returns all tribes and their metadata. </p>

---

<br>

### getAllTribes

<p> This module comes preset with a number of tribes. These include Mage, Alchemist, Dragon, Healer, and Knight. The metadata associated with these tribes will be returned in the demo. </p>

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
import { Story } from '@storybook/react';

export default {
	title: 'Components/GetAllTribes',
	component: GetAllTribes,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template: Story = (args) => (
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
import { MetaDataFormatted } from '../source/types';

export const GetAllTribes = ({ tribeOne, tribeTwo, ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState<MetaDataFormatted[] | null>(null);

	useEffect(() => {
		if (tribes.getAllTribes) {
			tribes.getAllTribes().then(setData);
		}
	}, [tribes.getAllTribes]);

	return (
		<div className="tribes">
			<div>All Tribes: </div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
};

GetAllTribes.propTypes = {};

GetAllTribes.defaultProps = {};

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
