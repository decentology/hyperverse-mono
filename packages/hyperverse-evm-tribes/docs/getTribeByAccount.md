# Get Tribe by Account

<p> The `getTribeByAccount` function from `tribesLibrary` returns a tribe associated with an account. </p>

---

<br>

### getTribeByAccount

<p> The `getTribeByAccount` function takes in an id. </p>

```jsx

	const getTribeByAccount = async (account: string) => {
		console.log('in tribe by account', account)
		const tribeId = await getTribeId(account);
		console.log('in tribe by account 2', account)
		return await getTribe(tribeId!);
	}

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
import { useEvm } from '@decentology/hyperverse-evm/source';
import { useState, useEffect } from 'react';

export const GetTribeByAccount = ({ ...props }) => {
	const tribes = useTribes();
	const { address } = useEvm();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (tribes.getTribeByAccount) {
			tribes.getTribeByAccount(address).then(setData);
		}
	}, [tribes.getTribeByAccount]);

	const tribeOfAccount = () => {
		return data ? (
			<pre>Tribe: {JSON.stringify(data)}</pre>
		) : (
			<p>This account is not in a tribe!</p>
		);
	};

	return <div className="tribeMembers"> {tribeOfAccount()}</div>;
};

GetTribeByAccount.propTypes = {};

GetTribeByAccount.defaultProps = {};

```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
