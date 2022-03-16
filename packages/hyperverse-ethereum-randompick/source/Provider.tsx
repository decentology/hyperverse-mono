import { FC } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { HyperverseModuleInstance } from '@decentology/hyperverse';
import { RandomPick } from './useRandomPick';
const client = new QueryClient();

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	if (tenantId == null) {
		throw new Error('Tenant ID is required');
	}
	return (
		<QueryClientProvider client={client}>
			<RandomPick.Provider initialState={{ tenantId: tenantId }}>
				{children}
			</RandomPick.Provider>
		</QueryClientProvider>
	);
};

export { Provider };
