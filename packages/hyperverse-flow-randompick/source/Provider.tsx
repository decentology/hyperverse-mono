import { HyperverseModuleInstance } from '@decentology/hyperverse';
import { FC } from 'react';
import { Provider as RandomPickProvider } from './useRandomPick';

export const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	return <RandomPickProvider initialState={{ tenantId }}>{children}</RandomPickProvider>;
};
