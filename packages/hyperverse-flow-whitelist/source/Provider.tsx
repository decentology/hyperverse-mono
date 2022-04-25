import { HyperverseModuleInstance } from '@decentology/hyperverse';
import { FC } from 'react';
import { Provider as WhitelistProvider } from './useWhitelist';

export const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	return <WhitelistProvider initialState={{ tenantId: tenantId || '' }}>{children}</WhitelistProvider>;
};
