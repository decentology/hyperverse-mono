# Get Tribe Id

<p> The `getTribeId` function from `tribesLibrary` returns the id of a tribe. </p>

---

<br>

### getTribeId

<p> The `getTribeId` function takes in an account. </p>

```jsx
	const getTribeId = async (account: string) => {
		try {
			const id = await base.proxyContract?.getUserTribe(account);
			return id.toNumber() as number;
		} catch (err) {
			if (err instanceof Error) {
				if (err.message.includes('This member is not in a Tribe!')) {
					return null;
				}
			}
		};
	};
```

### Stories

```jsx

import { GetTribeId } from './getTribeId';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/getTribeID.mdx';

export default {
	title: 'Components/GetTribeId',
	component: GetTribeId,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetTribeId {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};

```

### Main UI Component

```jsx

import * as PropTypes from 'prop-types';
import { useTribes } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';
import { useEffect, useState } from 'react';

export const GetTribeId = ({ account, ...props }) => {
	const tribes = useTribes();
	const { address } = useEvm();
	const [data, setData] = useState(address);

	useEffect(() => {
		if (tribes.getTribeId) {
			tribes.getTribeId(address).then(setData);
		}
	}, [tribes.getTribeId]);

	const hasTribeId = () => {
		return data ? (
			<p>Tribe id: {data}</p>
		) : (
			<p>This account is not in a tribe!</p>
		);
	};

	return <div className="tribeId"> {hasTribeId()}</div>;
};

GetTribeId.propTypes = {};

GetTribeId.defaultProps = {};

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
