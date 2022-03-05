import { HyperverseModuleInstance, useHyperverse, Network } from '@decentology/hyperverse';
import { ERC20 } from './useERC20';
import { FC } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { useEnvironment } from './environment';
const client = new QueryClient();

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	const { network } = useHyperverse();
	const { tenantAddress } = useEnvironment();
	if (network.type === Network.Mainnet && tenantId === null) {
		throw new Error('Tenant ID is required for Mainnet');
	}
	return (
		<QueryClientProvider client={client}>
			<ERC20.Provider initialState={{ tenantId: tenantId || tenantAddress! }}>
				{children}
			</ERC20.Provider>
		</QueryClientProvider>
	);
};

export { Provider };
