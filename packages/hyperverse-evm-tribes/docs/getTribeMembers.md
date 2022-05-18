# Get Tribe Members

<p> The `getTribeMembers` function from `tribesLibrary` returns all members in a tribe. </p>

---

<br>

### getTribeMembers

<p> The `getTribeMembers` function takes in the tribe id tied to the tribe you are requesting member information from. </p>

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
import { Doc } from '../docs/getTribeMembers.mdx';

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
	const [data, setData] = useState([]);

	useEffect(() => {
		if (tribes.getTribeMembers) {
			tribes.getTribeMembers(props.tribeId).then(setData);
		}
	}, [tribes.getTribeMembers]);

	const hasTribeMembers = () => {
		return data.length > 0 ? (
			<p>There are members in this tribe.</p>
		) : (
			<p>There are no members in this tribe.</p>
		);
	};

	return <div className="tribeMembers"> {hasTribeMembers()}</div>;
};

GetTribeMembers.propTypes = {
	tribeId: PropTypes.number.isRequired,
};

GetTribeMembers.defaultProps = {};

```

### Args

<p> For the purposes of this demo we have given a tribe id of **1** which is the tribe id of Mage. There are no members in this tribe which is reflected in the results of the demo.</p>

```jsx

Demo.args = {
	tribeId: 1
};

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
