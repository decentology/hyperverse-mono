import { HyperverseModuleInstance } from '@decentology/hyperverse';
import { FC } from 'react';
import { Provider as NFTProvider } from './useNFT';

export const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	return <NFTProvider initialState={{ tenantId: tenantId || '' }}>{children}</NFTProvider>;
};
