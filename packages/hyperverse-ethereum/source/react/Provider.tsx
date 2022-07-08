import { FC } from 'react';
import { Provider as EvmProvider } from '@decentology/hyperverse-evm/react';
import { Ethereum } from './useEthereum';
import { Networks } from '../networks';
const Provider: FC<any> = ({ children, ...props }) => {
	return (
		<EvmProvider networks={Networks} {...props}>
			<Ethereum.Provider>{children}</Ethereum.Provider>
		</EvmProvider>
	);
};

export default Provider;
