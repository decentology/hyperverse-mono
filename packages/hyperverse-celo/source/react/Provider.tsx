import { FC } from 'react';
import { Provider as EvmProvider, } from '@decentology/hyperverse-evm/react';
import { Celo } from './useCelo';
import { Networks } from '../networks';
const Provider: FC<any> = ({ children, ...props }) => {
	return (
		<EvmProvider networks={Networks} { ...props}>
			<Celo.Provider>{children}</Celo.Provider>
		</EvmProvider>
	);
};

export default Provider;
