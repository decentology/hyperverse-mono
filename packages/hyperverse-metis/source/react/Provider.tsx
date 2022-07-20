import { FC } from 'react';
import { Provider as EvmProvider, ProviderProps } from '@decentology/hyperverse-evm/react';
import { Metis } from './useMetis';
import { Network, NetworkConfig } from '@decentology/hyperverse';
import { Networks } from '../networks';


const Provider: FC<ProviderProps> = ({ children, ...props }: ProviderProps) => {
	return (
		<EvmProvider networks={Networks} {...props}>
			<Metis.Provider>{children}</Metis.Provider>
		</EvmProvider>
	);
};

export default Provider;
