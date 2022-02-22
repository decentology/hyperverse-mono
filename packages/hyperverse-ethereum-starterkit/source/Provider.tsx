import { createContext, FC } from 'react';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { QueryClientProvider, QueryClient } from 'react-query';
import { HyperverseModuleInstance, networks, useHyperverse } from '@decentology/hyperverse';
import { Module } from './useHook';
import { TENANT_ADDRESS } from './constants';
const client = new QueryClient();



const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	const { network } = useHyperverse();
	if (network === networks.Mainnet && tenantId == null) {
		throw new Error('Tenant ID is required for Mainnet');
	}
	return (
		<QueryClientProvider client={client}>
			<Module.Provider initialState={{ tenantId: tenantId || TENANT_ADDRESS }}>
				{children}
			</Module.Provider>
		</QueryClientProvider>
	);
};

export { Provider };
