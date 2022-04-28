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

Demo.args = {
	account: '',
};
```

### Main UI Component

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useTribes } from '../source';
import './button.css';
import { useState, useEffect } from 'react';

export const GetTribeId = ({ ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState(null);
	useEffect(() => {
		return () => {
			tribes.getTribeId().then(setData);
		};
	}, [])

	return (
		<div className="tribe">
			Tribe Id: <b>{data}</b>
		</div>
	);
};

GetTribeId.propTypes = {
	account: PropTypes.string.isRequired,
};

GetTribeId.defaultProps = {};
```

### Args

```jsx
Demo.args = {
	account: '',
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
