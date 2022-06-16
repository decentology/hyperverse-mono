import { FC } from 'react';
import { HyperverseModuleInstance } from '@decentology/hyperverse';
import { Module } from './useHook';

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	if (!tenantId) {
		throw new Error('Tenant ID is required');
	}
	return (
			<Module.Provider initialState={{ tenantId: tenantId }}>{children}</Module.Provider>
	);
};

export { Provider };
