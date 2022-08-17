import { FC } from 'react';
import { Provider as EvmProvider } from '@decentology/hyperverse-evm/react';
import { Avalanche } from './useAvalanche';
import { Networks } from '../networks';
const Provider: FC<any> = ({ children, ...props }) => {
	return (
		<EvmProvider networks={Networks} {...props}>
			<Avalanche.Provider>{children}</Avalanche.Provider>
		</EvmProvider>
	);
};

export default Provider;
