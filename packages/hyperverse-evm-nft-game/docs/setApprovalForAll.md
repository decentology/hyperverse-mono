# Set Approval for All

<p> The `setApprovalForAll` function from `nftGameLibrary` approves all transfers of tokens to other addresses. </p>

---

<br>

### setApprovalForAll

<p> The `setApprovalForAll` function takes in the target address and a value of true for approved. </p>

```jsx
  const setApprovalForAll = async ({ to, approved }: { to: string; approved: boolean }) => {
    try {
      const setApprovalTxn = await base.proxyContract?.setApprovalForAll(to, approved);
      return setApprovalTxn.wait() as TransactionReceipt;
    } catch (error) {
      throw error;
    }
  }
```

### Stories

```jsx
import { SetApprovalForAll } from './setApprovalForAll';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/setApprovalForAll.mdx';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/SetApprovalForAll',
	component: SetApprovalForAll,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof SetApprovalForAll>;

const Template: ComponentStoryFn<typeof SetApprovalForAll> = (args: any) => (
	<HyperverseProvider>
		<SetApprovalForAll {...args} />
	</HyperverseProvider>
);

export const Approve = Template.bind({});

Approve.args = {
	operator: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	approved: true,
};

export const Deny = Template.bind({});

Deny.args = {
	operator: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	approved: false,
};
```

### Main UI Component

```jsx
import { useNFTGame } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const SetApprovalForAll = ({ ...props }: { operator: string; approved: boolean }) => {
	const { setApprovalForAll } = useNFTGame();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					setApprovalForAll!(props);
				}}
			>
				Set Approval for All
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
