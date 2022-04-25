import { HyperverseModuleInstance } from '@decentology/hyperverse';
import { FC } from 'react';
import { Provider as TokenProvider } from './useToken';

export const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	if (!tenantId) {
		throw new Error('Tenant ID is required');
	}
	return <TokenProvider initialState={{ tenantId: tenantId }}>{children}</TokenProvider>;
};
