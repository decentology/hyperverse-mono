import { ERC777 } from './useERC777';
import { FC } from 'react';
import { HyperverseModuleInstance } from '@decentology/hyperverse';

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	if (!tenantId) {
		throw new Error('Tenant ID is required');
	}
	return <ERC777.Provider initialState={{ tenantId: tenantId }}>{children}</ERC777.Provider>;
};

export { Provider };
