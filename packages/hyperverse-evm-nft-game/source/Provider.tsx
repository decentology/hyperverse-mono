import { NFTGame } from './useNFTGame';
import { FC } from 'react';
import { HyperverseModuleInstance } from '@decentology/hyperverse';

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	if (!tenantId) {
		throw new Error('Tenant ID is required');
	}
	return <NFTGame.Provider initialState={{ tenantId: tenantId }}>{children}</NFTGame.Provider>;
};

export { Provider };
