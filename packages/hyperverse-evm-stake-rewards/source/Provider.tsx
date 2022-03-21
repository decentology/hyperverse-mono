import { HyperverseModuleInstance } from '@decentology/hyperverse';
import { StakeRewards } from './useStakeRewards';
import { FC } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
const client = new QueryClient();

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	if (tenantId == null) {
		throw new Error('Tenant ID is required');
	}
	return (
		<QueryClientProvider client={client}>
			<StakeRewards.Provider initialState={{ tenantId: tenantId }}>{children}</StakeRewards.Provider>
		</QueryClientProvider>
	);
};

export { Provider };
