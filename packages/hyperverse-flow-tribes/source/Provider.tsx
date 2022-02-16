import { HyperverseModuleInstance } from '@decentology/hyperverse';
import { FC } from 'react';
import { Provider as TribesProvider } from './useTribes';

export const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	return <TribesProvider initialState={{ tenantId }}>{children}</TribesProvider>;
};
