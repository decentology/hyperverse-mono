import { FC } from 'react';
import { Provider as EvmProvider } from '@decentology/hyperverse-evm/react';
import { BSC } from './useBSC';
import { Networks } from '../networks';
const Provider: FC<any> = ({ children, ...props }) => {
	return (
		<EvmProvider networks={Networks} {...props}>
			<BSC.Provider>{children}</BSC.Provider>
		</EvmProvider>
	);
};

export default Provider;
