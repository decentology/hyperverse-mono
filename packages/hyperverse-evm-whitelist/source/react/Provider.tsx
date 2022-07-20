import { FC } from 'react';
import { HyperverseModuleInstance } from '@decentology/hyperverse';
import { Whitelist } from './useWhitelist';

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	if (!tenantId) {
		throw new Error('Tenant ID is required');
	}
	return (
			<Whitelist.Provider initialState={{ tenantId: tenantId }}>{children}</Whitelist.Provider>
	);
};

export { Provider };
