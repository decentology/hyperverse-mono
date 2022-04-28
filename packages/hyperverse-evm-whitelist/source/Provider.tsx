import { FC } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { HyperverseModuleInstance } from '@decentology/hyperverse';
import { Whitelist } from './useWhitelist';
const client = new QueryClient();

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	if (!tenantId) {
		throw new Error('Tenant ID is required');
	}
	return (
		<QueryClientProvider client={client}>
			<Whitelist.Provider initialState={{ tenantId: tenantId }}>{children}</Whitelist.Provider>
		</QueryClientProvider>
	);
};

export { Provider };
