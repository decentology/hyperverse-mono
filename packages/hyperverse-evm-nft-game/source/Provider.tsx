import { NFTGame1 } from './useNFTGame1';
import { FC } from 'react';
import { HyperverseModuleInstance } from '@decentology/hyperverse';

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	if (!tenantId) {
		throw new Error('Tenant ID is required');
	}
	return <NFTGame1.Provider initialState={{ tenantId: tenantId }}>{children}</NFTGame1.Provider>;
};

export { Provider };
