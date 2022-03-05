import { HyperverseModuleInstance } from '@decentology/hyperverse';
import { FC } from 'react';
import { Provider as TokenProvider } from './useToken';

export const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	return <TokenProvider initialState={{ tenantId: tenantId || '' }}>{children}</TokenProvider>;
};
