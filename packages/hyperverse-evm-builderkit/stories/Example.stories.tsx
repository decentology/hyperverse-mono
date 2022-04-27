import { HyperverseProvider } from './utils/Provider';
import { Meta, Story } from '@storybook/react';
import { useModule } from '../source';
import { useEvm } from '@decentology/hyperverse-evm/source';
const Button = () => {
	const { connect } = useEvm();
	const { factoryContract } = useModule();
	return <button onClick={() => connect()}>{factoryContract?.address}</button>;
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Example/Test1',
	component: Button,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as Meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story = (args) => (
	<HyperverseProvider>
		<Button {...args} />
	</HyperverseProvider>
);

export const Example = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Example.args = {};
