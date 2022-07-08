import { ApproveAll } from './setApprovalForAll';
import { HyperverseProvider } from './utils/Provider';
import Doc from '../docs/setApprovalForAll.mdx';

export default {
	title: 'Components/ApproveAll',
	component: ApproveAll,
	parameters: {
		docs: {
			page: Doc,
		},
	},
};

const Template = (args: any) => (
	<HyperverseProvider>
		<ApproveAll {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	to: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
	approved: true,
};
