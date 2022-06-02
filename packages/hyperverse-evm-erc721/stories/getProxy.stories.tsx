import { useERC721 } from '../source';
import { useEvm } from '@decentology/hyperverse-evm';
import { useEffect, useState } from 'react';
import { HyperverseProvider } from './utils/Provider';

export default {
	title: 'Components/GetProxy',
};
const Template = (args) => (
	<HyperverseProvider>
		<GetProxy {...args} />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {
	account: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
};

export const GetProxy = ({ ...props }: { account: string }) => {
	const erc721 = useERC721();
	const { address } = useEvm();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (erc721.getProxy) {
			erc721.getProxy(props.account).then(setData);
		}
	}, [erc721.getProxy]);

	return <div className="balanceOf"> Proxy Address: {data}</div>;
};