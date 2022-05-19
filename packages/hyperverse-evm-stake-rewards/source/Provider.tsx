import { StakeRewards } from './useStakeRewards';
import { FC } from 'react';
import { HyperverseModuleInstance } from '@decentology/hyperverse';

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	if (!tenantId) {
		throw new Error('Tenant ID is required');
	}
	return <StakeRewards.Provider initialState={{ tenantId: tenantId }}>{children}</StakeRewards.Provider>;
};

export { Provider };
