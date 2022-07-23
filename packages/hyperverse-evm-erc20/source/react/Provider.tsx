import { ERC20 } from './useERC20';
import { FC, PropsWithChildren} from 'react';
import { HyperverseModuleInstance } from '@decentology/hyperverse';

const Provider: FC<PropsWithChildren<any >> = ({ children, tenantId }) => {
	if (!tenantId) {
		throw new Error('Tenant ID is required');
	}
	return <ERC20.Provider initialState={{ tenantId: tenantId }}>{children}</ERC20.Provider>;
};

export { Provider };
