import { FC } from 'react';
import { Provider as EvmProvider, ProviderProps } from '@decentology/hyperverse-evm/react';
import { Metis } from './useMetis';
import { Network, NetworkConfig } from '@decentology/hyperverse';
import { NETWORKS } from '../networks';


const Provider: FC<ProviderProps> = ({ children, ...props }: ProviderProps) => {
	return (
		<EvmProvider networks={NETWORKS} {...props}>
			<Metis.Provider>{children}</Metis.Provider>
		</EvmProvider>
	);
};

export default Provider;
