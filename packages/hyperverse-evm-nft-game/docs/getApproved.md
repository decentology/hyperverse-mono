# Get Approved

<p> The `getApproved` function from `nftGameLibrary` approves another address. </p>

---

<br>

### getApproved

<p> The `getApproved` function takes in a token Id. </p>

```jsx
	const getApproved = async (tokenId: number) => { 
		try {
			const approved = await base.proxyContract?.getApproved(tokenId);
			return approved;
		} catch (error) {
			throw error;
		}
	}
```

### Stories
```jsx
import { GetApproved } from './getApproved';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/getApproved.mdx';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/GetApproved',
	component: GetApproved,
	parameters: {
		docs: {
			page: Doc,
		},
	},
} as ComponentMeta<typeof GetApproved>;

const Template: ComponentStoryFn<typeof GetApproved> = (args: any) => (
	<HyperverseProvider>
		<GetApproved {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	tokenId: 1,
};
```

### Main UI Component

```jsx
import { useNFTGame } from '../source/react';
import { useEvm } from '@decentology/hyperverse-evm';
import './style.css';

export const GetApproved = ({ ...props }: { tokenId: number }) => {
	const { getApproved } = useNFTGame();
	const { Connect } = useEvm();

	return (
		<>
			<Connect />
			<button
				type="button"
				className={['storybook-button', `storybook-button--large`].join(' ')}
				style={{ color: 'blue' }}
				onClick={() => {
					getApproved!(props.tokenId);
				}}
			>
				Get Approved
			</button>
		</>
	);
};
```

For more information about our modules please visit: [**Hyperverse Docs**](docs.hyperverse.dev)
