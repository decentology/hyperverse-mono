import { Approve } from './approve';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/approve.mdx';

export default {
	title: 'Components/Approve',
	component: Approve,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args) => (
	<HyperverseProvider>
		<Approve {...args} />
	</HyperverseProvider>
);

export const Address1 = Template.bind({});

Address1.args = {
	to: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	tokenId: 1,
};

export const Address2 = Template.bind({});

Address2.args = {
	to: '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
	tokenId: 1,
};
