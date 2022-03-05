import { FC } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { HyperverseModuleInstance, networks, useHyperverse } from '@decentology/hyperverse';
import { Tribes } from './useTribes';
import { useEnvironment } from './environment';
const client = new QueryClient();


const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	const { network } = useHyperverse();
	const {tenantAddress} = useEnvironment();
	if (network === networks.Mainnet && tenantId == null) {
		throw new Error('Tenant ID is required for Mainnet');
	}
	return (
		<QueryClientProvider client={client}>
			<Tribes.Provider initialState={{ tenantId: tenantId || tenantAddress! }}>
				{children}
			</Tribes.Provider>
		</QueryClientProvider>
	);
};

export { Provider };
