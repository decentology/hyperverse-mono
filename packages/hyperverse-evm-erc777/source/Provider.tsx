import { HyperverseModuleInstance, useHyperverse } from '@decentology/hyperverse';
import { ERC777 } from './useERC777';
import { FC } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { useEnvironment } from './environment';
const client = new QueryClient();

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	const { network } = useHyperverse();
	const { tenantAddress } = useEnvironment();
	if (network.type === network.Mainnet && tenantId === null) {
		throw new Error('Tenant ID is required for Mainnet');
	}
	return (
		<QueryClientProvider client={client}>
			<ERC777.Provider initialState={{ tenantId: tenantId || tenantAddress! }}>
				{children}
			</ERC777.Provider>
		</QueryClientProvider>
	);
};

export { Provider };
