# Get Tribe Members

<p> The `getTribeMembers` function from `tribesLibrary` returns all members in a tribe. </p>

---

<br>

### getTribeMembers

<p> The `getTribeMembers` function takes in a tribeId associated with the tribe you are requesting member information from. </p>

```jsx
	const getTribeMembers = async (tribeId: number) => {
		try {
			const events = await base.proxyContract?.queryFilter(
				base.proxyContract?.filters.JoinedTribe(),
				0
			);
			const members = events
				?.map(e => {
					if (e.args) {
						return {
							tribeId: e.args[0].toNumber(),
							account: e.args[1]
						};
					}
				})
				.filter(e => e?.tribeId === tribeId);
			return members;
		} catch (err) {
			throw err;
		}
	};
```

### Stories

```jsx
import { GetTribeMembers } from './getTribeMembers';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/tribeMembers.mdx';

export default {
	title: 'Components/GetTribeMembers',
	component: GetTribeMembers,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetTribeMembers {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});
Demo.args = {
	tribeId: 1
};
```

### Main UI Component

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useState, useEffect } from 'react';

export const GetTribeMembers = ({ ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState(null);
	useEffect(() => {
		return () => {
			tribes.getTribeMembers().then(setData);
		};
	}, []);

	return (
		<div className="tribeMembers">
			Tribe Members: <b>{data}</b>
		</div>
	);
};

GetTribeMembers.propTypes = {
	tribeId: PropTypes.number.isRequired,
};

GetTribeMembers.defaultProps = {};
```

### Args

```jsx
GetTribeMembers.propTypes = {
	tribeId: PropTypes.number.isRequired,
};

GetTribeMembers.defaultProps = {};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
