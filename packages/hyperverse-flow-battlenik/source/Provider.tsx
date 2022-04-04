import { HyperverseModuleInstance } from '@decentology/hyperverse';
import { FC } from 'react';
import { Provider as BattleNikProvider } from './useBattleNik';

export const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	if (!tenantId) {
		throw new Error('Tenant ID is required');
	}
	return <BattleNikProvider initialState={{ tenantId: tenantId }}>{children}</BattleNikProvider>;
};
