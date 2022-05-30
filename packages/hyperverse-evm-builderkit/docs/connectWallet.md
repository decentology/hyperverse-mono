# Connect Wallet

<p> Connect your wallet with our Builder Kit! </p>

---

<br>

### Stories

```jsx

import { HyperverseProvider } from './utils/Provider';
import { Meta, Story } from '@storybook/react';
import { useModule } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';

const Button = () => {
	const { connect } = useEvm();
	const { factoryContract } = useModule();
	return <button onClick={() => connect()}>{factoryContract?.address}</button>;
};

export default {
	title: 'Components/ConnectWallet',
	component: Button,
} as Meta;

const Template: Story = (args: any) => (
	<HyperverseProvider>
		<Button {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};

```

For more information about our modules please visit: [**Hyperverse Docs**](https://docs.hyperverse.dev)
