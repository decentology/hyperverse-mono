import { createContext, FC } from 'react';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { QueryClientProvider, QueryClient } from 'react-query';
import { HyperverseModuleInstance, Network, useHyperverse } from '@decentology/hyperverse';
import { Module } from './useHook';
import { useEnvironment } from './environment';
const client = new QueryClient();

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	const { network } = useHyperverse();
	const { tenantAddress } = useEnvironment();
	if (network.type === Network.Mainnet && tenantId == null) {
		throw new Error('Tenant ID is required for Mainnet');
	}
	return (
		<QueryClientProvider client={client}>
			<Module.Provider initialState={{ tenantId: tenantId || tenantAddress! }}>
				{children}
			</Module.Provider>
		</QueryClientProvider>
	);
};

export { Provider };
