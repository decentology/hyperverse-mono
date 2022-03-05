import { FC } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { HyperverseModuleInstance, Network, useHyperverse } from '@decentology/hyperverse';
import { ERC721 } from './useERC721';
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
			<ERC721.Provider initialState={{ tenantId: tenantId || tenantAddress! }}>
				{children}
			</ERC721.Provider>
		</QueryClientProvider>
	);
};

export { Provider };
