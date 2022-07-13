import { FC } from 'react';
import { HyperverseModuleInstance } from '@decentology/hyperverse';
import { Tribes } from './useTribes';

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	if (!tenantId) {
		throw new Error('Tenant ID is required');
	}
	return (
			<Tribes.Provider initialState={{ tenantId: tenantId }}>{children}</Tribes.Provider>
	);
};

export { Provider };
