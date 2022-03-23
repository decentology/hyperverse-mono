import { HyperverseModuleInstance } from '@decentology/hyperverse';
import { ERC20 } from './useERC20';
import { FC } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
const client = new QueryClient();

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	if (!tenantId) {
		throw new Error('Tenant ID is required');
	}
	return (
		<QueryClientProvider client={client}>
			<ERC20.Provider initialState={{ tenantId: tenantId }}>{children}</ERC20.Provider>
		</QueryClientProvider>
	);
};

export { Provider };
