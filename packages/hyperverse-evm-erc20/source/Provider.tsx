import { ERC20 } from './useERC20';
import { FC } from 'react';
import { HyperverseModuleInstance } from '@decentology/hyperverse';

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	if (!tenantId) {
		throw new Error('Tenant ID is required');
	}
	return <ERC20.Provider initialState={{ tenantId: tenantId }}>{children}</ERC20.Provider>;
};

export { Provider };
