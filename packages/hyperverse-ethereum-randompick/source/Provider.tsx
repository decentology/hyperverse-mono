import { FC } from 'react';
import { HyperverseModuleInstance } from '@decentology/hyperverse';
import { RandomPick } from './useRandomPick';

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	if (tenantId == null) {
		throw new Error('Tenant ID is required');
	}
	return (
		<RandomPick.Provider initialState={{ tenantId: tenantId }}>{children}</RandomPick.Provider>
	);
};

export { Provider };
