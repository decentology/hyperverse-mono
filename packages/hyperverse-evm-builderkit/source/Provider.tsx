import { FC } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { HyperverseModuleInstance } from '@decentology/hyperverse';
import { Module } from './useHook';
const client = new QueryClient();

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	if (tenantId == null) {
		throw new Error('Tenant ID is required');
	}
	return (
		<QueryClientProvider client={client}>
			<Module.Provider initialState={{ tenantId: tenantId }}>{children}</Module.Provider>
		</QueryClientProvider>
	);
};

export { Provider };
