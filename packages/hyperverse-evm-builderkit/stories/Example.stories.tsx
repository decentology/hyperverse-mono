import { HyperverseProvider } from './utils/Provider';

const Button = () => <button>Sample</button>

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Example/Button',
	component: Button,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => (
	<HyperverseProvider>
		<Button {...args} />
	</HyperverseProvider>
);

export const Account = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Account.args = {};
