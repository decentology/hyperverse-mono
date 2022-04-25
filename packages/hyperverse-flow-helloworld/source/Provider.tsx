import { HyperverseModuleInstance } from '@decentology/hyperverse';
import { FC } from 'react';
import { Provider as HelloWorldProvider } from './useHelloWorld';

export const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	if (!tenantId) {
		throw new Error('Tenant ID is required');
	}
	return <HelloWorldProvider initialState={{ tenantId: tenantId }}>{children}</HelloWorldProvider>;
};
