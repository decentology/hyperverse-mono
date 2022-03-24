import { HyperverseModuleInstance } from '@decentology/hyperverse';
import { ERC777 } from './useERC777';
import { FC } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
const client = new QueryClient();

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	if (tenantId == null) {
		throw new Error('Tenant ID is required');
	}
	return (
		<QueryClientProvider client={client}>
			<ERC777.Provider initialState={{ tenantId: tenantId }}>{children}</ERC777.Provider>
		</QueryClientProvider>
	);
};

export { Provider };
