import { HyperverseModuleInstance } from '@decentology/hyperverse';
import { FC } from 'react';
import { Provider as TribesProvider } from './useTribes';

export const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	if (!tenantId) {
		throw new Error('Tenant ID is required');
	}
	return <TribesProvider initialState={{ tenantId: tenantId }}>{children}</TribesProvider>;
};
