import { FC } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { HyperverseModuleInstance } from '@decentology/hyperverse';
import { ERC721 } from './useERC721';
const client = new QueryClient();

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	if (!tenantId) {
		throw new Error('Tenant ID is required');
	}
	return (
		<QueryClientProvider client={client}>
			<ERC721.Provider initialState={{ tenantId: tenantId }}>{children}</ERC721.Provider>
		</QueryClientProvider>
	);
};

export { Provider };
