# Get Total Tenants

<p> The `getTotalTenants` function from `tribesLibrary` returns the total number of tenants in a tribe. </p>

---

<br>

### getTotalTenants

```jsx
const getTotalTenants = async () => {
	try {
		const tenantCount = await factoryContract.tenantCounter();

		return tenantCount.toNumber();
	} catch (err) {
		factoryErrors(err);
		throw err;
	}
};
```

### Stories

```jsx
import { GetTotalTenants } from './totalTenants';
import { HyperverseProvider } from './utils/Provider';
import React from 'react';
import { Doc } from '../docs/totalTenants.mdx';

export default {
	title: 'Components/GetTotalTenants',
	component: GetTotalTenants,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetTotalTenants {...args} />
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

export const GetTotalTenants = ({ ...props }) => {
	const tribes = useTribes();
	const [data, setData] = useState(null);

	useEffect(() => {
		return () => {
			tribes.getTotalTenants().then(setData);
		};
	}, []);

	return (
		<div className="totalTenants">
			Total Tenants: <b>{data}</b>
		</div>
	);
};

GetTotalTenants.propTypes = {};

GetTotalTenants.defaultProps = {};
```

### Args

```jsx
GetTotalTenants.propTypes = {};

GetTotalTenants.defaultProps = {};
```

### Provider.tsx

<p> An initial tenantId of `0x62a7aa79a52591Ccc62B71729329A80a666fA50f` is given which returns a value of **1** in the demo.</p>

```jsx
import { initialize, Network, Provider } from '@decentology/hyperverse';
import { Localhost } from '@decentology/hyperverse-evm';
import * as Tribes from '../../source';

export const HyperverseProvider = ({ children }) => {
	const hyperverse = initialize({
		blockchain: Localhost,
		network: {
			type: Network.Testnet,
			chainId: 1337,
			name: 'localhost',
			networkUrl: 'http://localhost:6006/hyperchain',
		},
		modules: [{ bundle: Tribes, tenantId: '0x62a7aa79a52591Ccc62B71729329A80a666fA50f' }],
	});
	return <Provider initialState={hyperverse}>{children}</Provider>;
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
