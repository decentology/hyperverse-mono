import { FC } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { HyperverseModuleInstance, Network, useHyperverse } from '@decentology/hyperverse';
import { ERC721 } from './useERC721';
import { useEnvironment } from './environment';
const client = new QueryClient();

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	const { network } = useHyperverse();
	if (tenantId == null) {
		throw new Error('Tenant ID is required');
	}
	return (
		<QueryClientProvider client={client}>
			<ERC721.Provider initialState={{ tenantId: tenantId }}>
				{children}
			</ERC721.Provider>
		</QueryClientProvider>
	);
};

export { Provider };
