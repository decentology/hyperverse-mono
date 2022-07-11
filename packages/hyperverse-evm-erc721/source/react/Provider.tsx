import { ERC721 } from './useERC721';
import { FC } from 'react';
import { HyperverseModuleInstance } from '@decentology/hyperverse';

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	if (!tenantId) {
		throw new Error('Tenant ID is required');
	}
	return <ERC721.Provider initialState={{ tenantId: tenantId }}>{children}</ERC721.Provider>;
};

export { Provider };
