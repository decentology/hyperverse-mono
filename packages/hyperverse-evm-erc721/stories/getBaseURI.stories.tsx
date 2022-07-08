import { GetBaseURI } from './getBaseURI';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/togglePublicMint.mdx';

export default {
	title: 'Components/GetBaseURI',
	component: GetBaseURI,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<GetBaseURI {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
