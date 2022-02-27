import { HyperverseModuleInstance, useHyperverse, networks } from '@decentology/hyperverse';
import { StakeRewards }  from './useStakeRewards'
import { FC } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
const client = new QueryClient();

import { TENANT_ADDRESS }from './constants'

const Provider: FC<HyperverseModuleInstance> = ({children, tenantId}) => {
	const { network } = useHyperverse();
	if (network === networks.Mainnet && tenantId === null) {
		throw new Error('Tenant ID is required for Mainnet');
	}
	return (
		<QueryClientProvider client={client}>
			<StakeRewards.Provider initialState={{tenantId: tenantId || TENANT_ADDRESS}}>{children}</StakeRewards.Provider>
		</QueryClientProvider>
	);
};

export { Provider };