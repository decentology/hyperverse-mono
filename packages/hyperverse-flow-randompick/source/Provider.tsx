import { HyperverseModuleInstance } from '@decentology/hyperverse';
import { FC } from 'react';
import { Provider as RandomPickProvider } from './useRandomPick';

export const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	if (!tenantId) {
		throw new Error('Tenant ID is required');
	}
	return <RandomPickProvider initialState={{ tenantId: tenantId }}>{children}</RandomPickProvider>;
};
