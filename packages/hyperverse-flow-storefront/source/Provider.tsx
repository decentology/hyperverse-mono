import { HyperverseModuleInstance } from '@decentology/hyperverse';
import { FC } from 'react';
import { Provider as StorefrontProvider } from './useStorefront';

export const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	return <StorefrontProvider initialState={{ tenantId: tenantId || '' }}>{children}</StorefrontProvider>;
};
